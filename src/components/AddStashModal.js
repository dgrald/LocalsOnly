import React, { Component } from 'react';
import StashMap from './StashMap';
import {Modal, Button} from 'react-bootstrap';
import './AddStashModal.css';
import LoadMask from './LoadMask';
import ErrorModal from './ErrorModal';
import StashStore from '../stores/StashStore';
import NewLocationSelectReducer from '../reducers/NewLocationSelectReducer';
import AddLocationButtonClassReducer from '../reducers/AddLocationButtonClassReducer';

class AddStashModal extends Component {
  state = {
    selectlocation: null,
    description: "",
    markers: [],
    postButtonClass: "disabled",
    loadMask: false,
    hasError: false,
    error: null
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
    if(this.state.description && this.state.selectlocation) {
      this.setState({loadMask: true, postButtonClass: "disabled"});
      let location = {type: "Point", coordinates: [this.state.selectlocation.lng, this.state.selectlocation.lat]};
      let data = {name: this.state.description, location: location};
      StashStore.addStash(data).then(function(){
          this.onSuccess();
        }.bind(this), function(error){
          this.onFailure(error);
        }.bind(this));
    }
  }

  selectedlocationchange = (newValue) => {
    let newState = NewLocationSelectReducer.getNewState(this.state.description, newValue);
    this.setState(newState);
  }

  handleDescriptionChange = (event) => {
    let newState = {
      description: event.target.value,
      postButtonClass: AddLocationButtonClassReducer.getNewClass(event.target.value, this.state.selectlocation)
    };
    this.setState(newState);
  }

  render() {
    return (
      <div>
      <Modal.Header closeButton>
        <Modal.Title>Add Stash</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <StashMap selectedlocationchange={this.selectedlocationchange.bind(this)} markers={this.state.markers}/>
      <div className="formSection">
        <input type="text" value={this.state.description} placeholder="Enter Description" onChange={this.handleDescriptionChange}/>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={this.state.postButtonClass} onClick={this.post}>Add Stash</Button>
        <Button onClick={this.props.close}>Close</Button>
      </Modal.Footer>
      <LoadMask show={this.state.loadMask}/>
      <ErrorModal show={this.state.hasError} message={this.state.error}/>
      </div>
    );
  }
}

export default AddStashModal;
