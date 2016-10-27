var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AddLocationButtonClassReducer = assign({}, EventEmitter.prototype, {
  getNewClass: function(description, locationSelect) {
    return (description && locationSelect) ? "btn-primary" : "disabled";
  }
});

module.exports = AddLocationButtonClassReducer;
