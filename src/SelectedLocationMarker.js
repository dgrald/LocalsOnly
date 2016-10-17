import React, { Component } from 'react';
import { Marker } from 'react-leaflet';

class SelectedLocationMarker extends Component {
  render() {
    if(this.props.selectedlocation) {
      return <Marker position={this.props.selectedlocation}></Marker>;
    } else {
      return null;
    }
  }
}

SelectedLocationMarker.propTypes = {
  selectedlocation: React.PropTypes.array
};

export default SelectedLocationMarker;
