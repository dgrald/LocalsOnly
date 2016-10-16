import React, { Component } from 'react';
import './AddStashButton.css';
import {Button, Modal} from 'react-bootstrap';
import AddStashModal from './AddStashModal';

class AddStashButton extends Component {
  state = {
    showModal: false
  };

  close = () => {
    this.setState({showModal: false});
  }

  open = () => {
    this.setState({showModal: true});
  }

  render() {
    return (
      <div>
        <Button className="add-stash-button"
          bsStyle="primary"
          onClick={this.open}
        >
          Add Stash
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Stash</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <AddStashModal />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddStashButton;
