import React, { Component } from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import _ from 'lodash';
import StashMarkerPopup from './StashMarkerPopup';
import L from 'leaflet';

class StashMarkers extends Component {

  render() {
    let me = this;
    var stashes = _.map(this.props.markers, function(nextStash, index){
        let popup = nextStash.name ?
        <Popup key={"popup" + nextStash.id}>
          <StashMarkerPopup key={"StashMarkerPopup" + nextStash.id} stash={nextStash} refreshStashes={me.props.refreshStashes}/>
        </Popup>
        :
        null;
        switch (nextStash.location.type) {
          case "LineString":
            let positions = _.map(nextStash.location.coordinates, (next) => {
              return L.latLng(next[1], next[0]);
            });
            let markers = _.map(positions, (next, positionIndex) => {
              if(positionIndex === 0 || positionIndex === positions.length - 1) {
                let nextPosition = [next.lat, next.lng];
                return <Marker position={nextPosition} key={index + "marker" + positionIndex}>{popup}</Marker>;
              }
            });
            return <div key={index + "linediv"}><Polyline positions={positions} key={index + "polyline"}>{popup}</Polyline>{markers}</div>;
          default:
            let nextPosition = [nextStash.location.coordinates[1], nextStash.location.coordinates[0]];
            return <Marker position={nextPosition} key={index}>
                      {popup}
                    </Marker>;
        }
    });

    return <div>{stashes}</div>;
  }
}

export default StashMarkers;
