import React, { Component } from 'react';
import StashMap from './StashMap';
import {Modal, Button, FormGroup} from 'react-bootstrap';
import './AddStashModal.css';
import LoadMask from './LoadMask';
import ErrorModal from './ErrorModal';
import SelectModeRadio from './SelectModeRadio';
import StashStore from '../stores/StashStore';
import NewLocationSelectReducer from '../reducers/NewLocationSelectReducer';
import AddLocationButtonClassReducer from '../reducers/AddLocationButtonClassReducer';

class AddStashModal extends Component {
  state = {
    description: "",
    markers: [],
    postButtonClass: "disabled",
    loadMask: false,
    hasError: false,
    error: null,
    mode: "Point"
  }

  onSuccess = () => {
    this.setState({loadMask: false});
    this.props.close();
  }

  onFailure = (error) => {
    let errorMessage = error.statusText + ": " + error.responseText
    this.setState({loadMask: false, hasError: true, error: errorMessage, postButtonClass: AddLocationButtonClassReducer.getNewClass(this.state.description, this.state.selectlocation)});
  }

  post = () => {
    if(this.state.description && this.state.markers.length) {
      this.setState({loadMask: true, postButtonClass: "disabled"});
      let data = {name: this.state.description, location: this.state.markers[0].location};
      StashStore.addStash(data).then(function(){
          this.onSuccess();
        }.bind(this), function(error){
          this.onFailure(error);
        }.bind(this));
    }
  }

  clear = () => {
    this.setState({markers: [], description: ""});
  }

  selectedlocationchange = (newValue) => {
    let newState = NewLocationSelectReducer.getNewState(this.state, newValue);
    this.setState(newState);
  }

  handleDescriptionChange = (event) => {
    let newState = {
      description: event.target.value,
      postButtonClass: AddLocationButtonClassReducer.getNewClass(event.target.value, this.state.markers)
    };
    this.setState(newState);
  }

  onGeometryChange = (newValue) => {
    this.setState({mode: newValue.target.value, markers: []});
  }

  render() {
    return (
      <div>
      <Modal.Header closeButton>
        <Modal.Title>Add Stash</Modal.Title>
        <SelectModeRadio geometry={this.state.mode} onGeometryChange={this.onGeometryChange}/>
      </Modal.Header>
      <Modal.Body>
      <StashMap selectedlocationchange={this.selectedlocationchange.bind(this)} markers={this.state.markers}/>
      <div className="formSection">
        <input type="text" value={this.state.description} placeholder="Enter Description" onChange={this.handleDescriptionChange}/>
      </div>
      </Modal.Body>
      <Modal.Footer>
      <FormGroup>
        <Button className={this.state.postButtonClass} onClick={this.post}>Add Stash</Button>
        <Button onClick={this.clear}>Clear</Button>
        <Button onClick={this.props.close}>Close</Button>
      </FormGroup>
      </Modal.Footer>
      <LoadMask show={this.state.loadMask}/>
      <ErrorModal show={this.state.hasError} message={this.state.error}/>
      </div>
    );
  }
}

export default AddStashModal;
