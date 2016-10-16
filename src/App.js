import React, { Component } from 'react';
import './App.css';
import StashMap from './StashMap';
import AddStashButton from './AddStashButton';

class App extends Component {
  render() {
    return (
      <div id="container">
          <StashMap source="https://locals-only-service.herokuapp.com/trails"></StashMap>
          <AddStashButton />
      </div>
    );
  }
}

export default App;
