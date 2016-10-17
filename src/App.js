import React, { Component } from 'react';
import './App.css';
import StashMap from './StashMap';

class App extends Component {

  render() {
    const source = "https://locals-only-service.herokuapp.com/trails"

    return (
      <div id="container">
          <StashMap source={source}></StashMap>
      </div>
    );
  }
}

export default App;
