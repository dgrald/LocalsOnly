var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
import AddLocationButtonClassReducer from './AddLocationButtonClassReducer';

var NewLocationSelectReducer = assign({}, EventEmitter.prototype, {
  getNewState: function(oldState, locationSelect) {
    let newPostButtonClass = AddLocationButtonClassReducer.getNewClass(oldState.description, locationSelect);
    let newCoordinates = [locationSelect.lng, locationSelect.lat];
    switch (oldState.mode) {
      case "LineString":
        let updatedCoordinates = (oldState.markers && oldState.markers.length) ?
          oldState.markers[0].location.coordinates.concat([newCoordinates])
          : [newCoordinates];
        return {
          selectlocation: locationSelect,
          postButtonClass: newPostButtonClass,
          markers: [{location: {coordinates : updatedCoordinates, type: oldState.mode}}]
        };
      default:
        return {
          selectlocation: locationSelect,
          postButtonClass: newPostButtonClass,
          markers: [{location: {coordinates : newCoordinates, type: "Point"}}]
        };
    }
  }
});

module.exports = NewLocationSelectReducer;
