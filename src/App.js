import React, { Component } from 'react';
import './App.css';
import StashMap from './StashMap';

class App extends Component {
  render() {
    return (
      <div id="container">
          <StashMap source="https://locals-only-service.herokuapp.com/trails"></StashMap>
      </div>
    );
  }
}

export default App;
