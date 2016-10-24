import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import _ from 'lodash';
import StashMarkerPopup from './StashMarkerPopup';

class StashMarkers extends Component {

  render() {
    let me = this;
    var stashes = _.map(this.props.markers, function(nextStash, index){
        let nextPosition = [nextStash.location.coordinates[1], nextStash.location.coordinates[0]];
        let popup = nextStash.name ?
        <Popup key={"popup" + nextStash.id}>
          <StashMarkerPopup key={"StashMarkerPopup" + nextStash.id} stash={nextStash} refreshStashes={me.props.refreshStashes}/>
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
