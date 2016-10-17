import React, { Component } from 'react';
import './App.css';
import StashMap from './StashMap';
import AddStashButton from './AddStashButton';
import $ from 'jquery';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stashes : [] };
  }

  source = () => {
    return "https://locals-only-service.herokuapp.com/trails";
  }

  componentDidMount() {
    this.refreshStashes();
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  refreshStashes = () => {
      this.serverRequest = $.get(this.source(), function (result) {
        this.setState({
          stashes: result
        });
      }.bind(this));
  }

  render() {
    return (
      <div id="container">
          <StashMap markers={this.state.stashes}></StashMap>
          <AddStashButton refreshStashes={this.refreshStashes}/>
      </div>
    );
  }
}

export default App;
