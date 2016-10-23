import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import _ from 'lodash';

class StashMarkers extends Component {

  render() {
    var stashes = _.map(this.props.markers, function(nextStash, index){
        let nextPosition = [nextStash.location.coordinates[1], nextStash.location.coordinates[0]];
        let popup = nextStash.name ?
        <Popup>
          <span>{nextStash.name}</span>
        </Popup>
        :
        null;
        return <Marker position={nextPosition} key={index}>
                  {popup}
                </Marker>;
    });

    return <div>{stashes}</div>;
  }
}

export default StashMarkers;
