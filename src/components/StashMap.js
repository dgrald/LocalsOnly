import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import StashMarkers from './StashMarkers';

class StashMap extends Component {
  state = {
      lat: 40.576,
      lng: -111.628,
      zoom: 13,
      selectLocation: []
  };

  selectLocation = (e) => {
    if(this.props.selectedlocationchange) {
      this.props.selectedlocationchange(e.latlng);
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <div>
      <Map center={position} zoom={this.state.zoom} onClick={this.selectLocation}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/dgrald/ciu7h14go00082hqnzimmf3oq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGdyYWxkIiwiYSI6ImNpanJoaXRhYjBha2Z0aG01OW1ha3Q5ZG4ifQ.oVkcFro9ahsr9cLcZgoTgg"
        />
        <StashMarkers markers={this.props.markers} refreshStashes={this.props.refreshStashes}/>
      </Map>
      </div>
    );
  }
}

export default StashMap;
