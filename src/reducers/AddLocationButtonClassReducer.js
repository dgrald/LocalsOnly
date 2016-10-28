var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AddLocationButtonClassReducer = assign({}, EventEmitter.prototype, {
  getNewClass: function(description, markers) {
    return (description && markers && markers.length) ? "btn-primary" : "disabled";
  }
});

module.exports = AddLocationButtonClassReducer;
