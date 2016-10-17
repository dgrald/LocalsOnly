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
    this.props.refreshStashes();
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
          <AddStashModal close={this.close}/>
        </Modal>
      </div>
    );
  }
}

export default AddStashButton;
