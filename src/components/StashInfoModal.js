import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import LoadMask from './LoadMask';
import ErrorModal from './ErrorModal';
import StashStore from '../stores/StashStore';

class StashInfoModal extends Component {
  state = {
      hasError: false,
      loadMask: false,
      error: null
  };

  delete = () => {
    this.setState({loadMask: true});
    StashStore.deleteStash(this.props.stash).then(() => {
      this.setState({loadMask: false});
      this.props.close();
      this.props.refreshStashes();
    }, (error) => {
      this.setState({loadMask: false, hasError: true, error: error});
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
        <Button bsStyle="primary" onClick={this.delete}>Delete Stash</Button>
        <Button onClick={this.props.close}>Close</Button>
      </Modal.Footer>
      <LoadMask show={this.state.loadMask}/>
      <ErrorModal show={this.state.hasError} message={this.state.error}/>
      </div>
    );
  }
}

export default StashInfoModal;
