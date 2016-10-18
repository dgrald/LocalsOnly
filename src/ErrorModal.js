import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class ErrorModal extends Component {

  state: {
    show: true
  }

  show = () => {
    return this.props.show && this.state.show;
  }

  close = () => {
    this.setState({show: false});
  }

  render() {
    return (
      <Modal show={this.show()} onHide={this.close}>
          <Modal.Header>
              <h1>Error</h1>
          </Modal.Header>
          <Modal.Body>
              <div>{this.props.message}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
      </Modal>
    );
  }
}

export default ErrorModal;
