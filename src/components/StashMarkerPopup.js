import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import StashInfoModal from './StashInfoModal';

class StashMarkerPopup extends Component {
  state = {
    showModal: false
  };

  showModal = () => {
    this.setState({showModal: true});
  }

  close = () => {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div>
        <div>{this.props.stash.name}</div>
        <Button
          bsStyle="primary"
          onClick={this.showModal}
        >
          See full item
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <StashInfoModal close={this.close} stash={this.props.stash} refreshStashes={this.props.refreshStashes}/>
        </Modal>
      </div>
    );
  }
}

export default StashMarkerPopup;
