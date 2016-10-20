import React, { Component } from 'react';
import StashMap from './StashMap';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';
import './AddStashModal.css';
import LoadMask from './LoadMask';
import ErrorModal from './ErrorModal';

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
    this.setState({loadMask: false, hasError: true, error: errorMessage});
  }

  getPostButtonClass = (inputLocation, inputDescription) => {
    if(!inputDescription) {
      return "disabled";
    }

    return inputLocation ? "btn-primary" : "disabled";
  }

  post = () => {
    if(this.state.description && this.state.selectlocation) {
      this.setState({loadMask: true});
      let location = {type: "Point", coordinates: [this.state.selectlocation.lng, this.state.selectlocation.lat]};
      let data = {name: this.state.description, location: location};
      $.ajax("https://locals-only-service.herokuapp.com/trails", {
          data : JSON.stringify(data),
          contentType : 'application/json',
          type : 'POST',
        }).then(function(){
          this.onSuccess();
        }.bind(this), function(error){
          this.onFailure(error);
        }.bind(this));
    }
  }

  selectedlocationchange = (newValue) => {
    this.setState({selectlocation: newValue, postButtonClass: this.getPostButtonClass(newValue, this.state.description), markers: [{location: {coordinates : [newValue.lng, newValue.lat], type: "Point"}}]});
  }

  handleDescriptionChange = (event) => {
    let newState = {
      description: event.target.value,
      postButtonClass: this.getPostButtonClass(this.state.selectlocation, event.target.value)
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
