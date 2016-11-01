import React, { Component } from 'react';
import './App.css';
import StashMap from './StashMap';
import AddStashButton from './AddStashButton';
import AddUserButton from './AddUserButton';
import StashStore from '../stores/StashStore';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stashes : [] };
  }

  componentDidMount() {
    this.refreshStashes();
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  refreshStashes = () => {
      this.serverRequest = StashStore.getAll().then(function(data){
        this.setState({
          stashes: data
        });
      }.bind(this));
  }

  render() {
    return (
      <div id="container">
          <StashMap markers={this.state.stashes} refreshStashes={this.refreshStashes}></StashMap>
          <AddStashButton refreshStashes={this.refreshStashes}/>
          <AddUserButton/>
      </div>
    );
  }
}

export default App;
