import React, { Component } from 'react';
import LoadMask from './LoadMask';
import ErrorModal from './ErrorModal';
import LoginStore from '../stores/LoginStore';
import {FormGroup, FormControl, Modal, ControlLabel, Button} from 'react-bootstrap';

class UserSignUp extends Component {
  state = {
    username: "",
    password: ""
  }

  onSuccess = () => {
    this.setState({loadMask: false});
    this.props.close();
  }

  onFailure = (error) => {
    let errorMessage = error.statusText + ": " + error.responseText
    this.setState({loadMask: false, hasError: true, error: errorMessage});
  }

  post = () => {
    if(this.state.username && this.state.password) {
      this.setState({loadMask: true});
      LoginStore.addUser(this.state.username, this.state.password).then(function(response){
          this.onSuccess(response);
        }.bind(this), function(error){
          this.onFailure(error);
        }.bind(this));
    }
  }

  getValidationState = () => {
    const length = this.state.username.length;
    if (length > 8) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleUserNameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="Enter username"
            onChange={this.handleUserNameChange}
          />
          <FormControl.Feedback />
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.handlePasswordChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
      </Modal.Body>
      <Modal.Footer>
      <FormGroup>
        <Button onClick={this.post} className="btn-primary">Add User</Button>
        <Button onClick={this.props.close}>Close</Button>
      </FormGroup>
      </Modal.Footer>
      <LoadMask show={this.state.loadMask}/>
      <ErrorModal show={this.state.hasError} message={this.state.error}/>
      </div>
    );
  }
}

export default UserSignUp;
