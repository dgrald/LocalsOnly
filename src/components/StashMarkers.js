import React, { Component } from 'react';
import { Marker, Popup, Polyline, Polygon} from 'react-leaflet';
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
          case "Polygon":
          case "LineString":
            let positions = _.map(nextStash.location.coordinates, (next) => {
              return L.latLng(next[1], next[0]);
            });
            if(nextStash.location.type === "LineString") {
              let lineMarkers = _.map(positions, (next, positionIndex) => {
                if(positionIndex === 0 || positionIndex === positions.length - 1) {
                  let nextPosition = [next.lat, next.lng];
                  return <Marker position={nextPosition} key={index + "marker" + positionIndex}>{popup}</Marker>;
                }
              });
              return <div key={index + "linediv"}><Polyline positions={positions} key={index + "polyline"}>{popup}</Polyline>{lineMarkers}</div>;
            } else {
              let polygonMarkers =  _.map(positions, (next, positionIndex) => {
                if(positionIndex === 0) {
                  let nextPosition = [next.lat, next.lng];
                  return <Marker position={nextPosition} key={index + "marker" + positionIndex}>{popup}</Marker>;
                }
              });
              return <div key={index + "polygondiv"}><Polygon positions={positions} key={index + "polygon"}>{popup}</Polygon>{polygonMarkers}</div>;
            }
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
