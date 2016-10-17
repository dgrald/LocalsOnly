import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import SelectedLocationMarker from './SelectedLocationMarker';
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
        <SelectedLocationMarker selectedlocation={this.props.selectedlocation}/>
        <StashMarkers markers={this.props.markers}/>
      </Map>
      </div>
    );
  }
}

export default StashMap;
