import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import SelectedLocationMarker from './SelectedLocationMarker';
import $ from "jquery";
import _ from "lodash";
import AddStashButton from "./AddStashButton";

class StashMap extends Component {
  state = {
      lat: 40.576,
      lng: -111.628,
      zoom: 13,
      selectLocation: [],
      stashes: []
  };

  refreshStashes = () => {
    if(this.props.source) {
      this.serverRequest = $.get(this.props.source, function (result) {
        this.setState({
          stashes: result
        });
      }.bind(this));
    }
  }

  componentDidMount() {
    this.refreshStashes();
  }

  componentWillUnmount() {
    if(this.props.source) {
      this.serverRequest.abort();
    }
  }

  selectLocation = (e) => {
    if(this.props.selectedlocationchange) {
      this.props.selectedlocationchange(e.latlng);
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    let stashes = _.map(this.state.stashes, function(nextStash, index){
        var nextPosition = [nextStash.location.latitude, nextStash.location.longitude]
        return <Marker position={nextPosition} key={index}>
                  <Popup>
                    <span>{nextStash.name}</span>
                  </Popup>
                </Marker>;
    });

    return (
      <div>
      <Map center={position} zoom={this.state.zoom} onClick={this.selectLocation}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/dgrald/ciu7h14go00082hqnzimmf3oq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGdyYWxkIiwiYSI6ImNpanJoaXRhYjBha2Z0aG01OW1ha3Q5ZG4ifQ.oVkcFro9ahsr9cLcZgoTgg"
        />
        {stashes}
        <SelectedLocationMarker selectedlocation={this.props.selectedlocation}/>
      </Map>
      <AddStashButton refreshStashes={this.refreshStashes}/>
      </div>
    );
  }
}

export default StashMap;
