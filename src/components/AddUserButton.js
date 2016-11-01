import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import UserSignUp from './UserSignUp';

class AddUserButton extends Component {
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
        <Button
          onClick={this.open}
        >
          Add User
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <UserSignUp close={this.close}/>
        </Modal>
      </div>
    );
  }
}

export default AddUserButton;
