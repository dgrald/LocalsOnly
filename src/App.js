import React, { Component } from 'react';
import './App.css';
import StashMap from './StashMap';

class App extends Component {
  render() {
    return (
      <div id="container">
          <StashMap source="http://localhost:8080/trails"></StashMap>
      </div>
    );
  }
}

export default App;
