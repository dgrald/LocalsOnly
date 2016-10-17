import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import $ from 'jquery';
import _ from 'lodash';

class StashMarkers extends Component {
  constructor() {
    super();
    this.state = {
      stashes: []
    };
  }

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

  render() {
    var stashes = _.map(this.state.stashes, function(nextStash, index){
        var nextPosition = [nextStash.location.latitude, nextStash.location.longitude]
        return <Marker position={nextPosition} key={index}>
                  <Popup>
                    <span>{nextStash.name}</span>
                  </Popup>
                </Marker>;
    });

    return <div>{stashes}</div>;
  }
}

export default StashMarkers;
