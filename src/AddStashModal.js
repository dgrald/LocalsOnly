import React, { Component } from 'react';
import StashMap from './StashMap';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';
import './AddStashModal.css';

class AddStashModal extends Component {
  state = {
    selectlocation: null,
    description: "",
    markers: [],
    postButtonClass: "disabled"
  }

  onSuccess = () => {
      this.props.close(true);
  }

  getPostButtonClass = (inputLocation, inputDescription) => {
    if(!inputDescription) {
      return false;
    }

    return inputLocation ? "btn-primary" : "disabled";
  }

  post = () => {
    let location = {latitude: this.state.selectlocation.lat, longitude: this.state.selectlocation.lng};
    let data = {name: this.state.description, location: location};
    $.ajax("https://locals-only-service.herokuapp.com/trails", {
        data : JSON.stringify(data),
        contentType : 'application/json',
        type : 'POST',
        success: this.onSuccess
      });
  }

  selectedlocationchange = (newValue) => {
    this.setState({selectlocation: newValue, postButtonClass: this.getPostButtonClass(newValue, this.state.description), markers: [{location: {latitude: newValue.lat, longitude: newValue.lng}}]});
  }

  handleDescriptionChange = (event) => {
    let newState = {
      description: event.target.value,
      selectlocation: this.state.selectlocation,
      markers: this.state.markers,
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
      </div>
    );
  }
}

export default AddStashModal;
