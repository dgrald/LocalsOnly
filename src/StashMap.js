import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import StashMarkers from './StashMarkers';

class StashMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 40.576,
      lng: -111.628,
      zoom: 13
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/dgrald/ciu7h14go00082hqnzimmf3oq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGdyYWxkIiwiYSI6ImNpanJoaXRhYjBha2Z0aG01OW1ha3Q5ZG4ifQ.oVkcFro9ahsr9cLcZgoTgg"
        />
        <StashMarkers source={this.props.source}></StashMarkers>
      </Map>
    );
  }
}

export default StashMap;
