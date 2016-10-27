var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
import AddLocationButtonClassReducer from './AddLocationButtonClassReducer';

var NewLocationSelectReducer = assign({}, EventEmitter.prototype, {
  getNewState: function(oldState, locationSelect) {
    return {
      selectlocation: locationSelect,
      postButtonClass: AddLocationButtonClassReducer.getNewClass(oldState.description, locationSelect),
      markers: [{location: {coordinates : [locationSelect.lng, locationSelect.lat], type: "Point"}}]
    };
  }
});

module.exports = NewLocationSelectReducer;
