import React, { Component } from 'react';
import StashMap from './StashMap';
import {Modal, Button} from 'react-bootstrap';
import $ from 'jquery';

class AddStashModal extends Component {
  state = {
    selectlocation: [],
    markers: [],
    postButtonClass: "disabled"
  }

  onSuccess = () => {
      this.props.close(true);
  }

  post = () => {
    let location = {latitude: this.state.selectlocation.lat, longitude: this.state.selectlocation.lng};
    let data = {name: "S", location: location};
    $.ajax("https://locals-only-service.herokuapp.com/trails", {
        data : JSON.stringify(data),
        contentType : 'application/json',
        type : 'POST',
        success: this.onSuccess
      });
  }

  selectedlocationchange = (newValue) => {
    this.setState({selectlocation: newValue, postButtonClass: "btn-primary", markers: [{location: {latitude: newValue.lat, longitude: newValue.lng}}]});
  }

  render() {
    return (
      <div>
      <Modal.Header closeButton>
        <Modal.Title>Add Stash</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <StashMap selectedlocationchange={this.selectedlocationchange.bind(this)} markers={this.state.markers}/>
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
