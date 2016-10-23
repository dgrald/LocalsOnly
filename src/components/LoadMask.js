import React, { Component } from 'react';
import {Modal, ProgressBar} from 'react-bootstrap';

class LoadMask extends Component {

  render() {
    return (
      <Modal show={this.props.show} onHide={this.close}>
          <Modal.Header>
              <h1>Processing...</h1>
          </Modal.Header>
          <Modal.Body>
              <ProgressBar striped bsStyle="info" now={80}/>
          </Modal.Body>
      </Modal>
    );
  }
}

export default LoadMask;
