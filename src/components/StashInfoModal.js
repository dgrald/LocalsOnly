import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import LoadMask from './LoadMask';
import ErrorModal from './ErrorModal';
import StashStore from '../stores/StashStore';

class StashInfoModal extends Component {
  state = {
      hasError: false,
      loadMask: false,
      error: null,
      deleteButtonClass: 'btn-primary'
  };

  delete = () => {
    this.setState({loadMask: true, deleteButtonClass: 'disabled'});
    StashStore.deleteStash(this.props.stash).then(() => {
      this.setState({loadMask: false});
      this.props.close();
      this.props.refreshStashes();
    }, (error) => {
      this.setState({loadMask: false, hasError: true, error: error, deleteButtonClass: 'btn-primary'});
    });
  }

  render() {
    return (
      <div>
      <Modal.Header closeButton>
        <Modal.Title>Stash</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>{this.props.stash.name}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={this.state.deleteButtonClass} onClick={this.delete}>Delete Stash</Button>
        <Button onClick={this.props.close}>Close</Button>
      </Modal.Footer>
      <LoadMask show={this.state.loadMask}/>
      <ErrorModal show={this.state.hasError} message={this.state.error}/>
      </div>
    );
  }
}

export default StashInfoModal;
