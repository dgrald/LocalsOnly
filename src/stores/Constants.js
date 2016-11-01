var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Constants = assign({}, EventEmitter.prototype, {
  baseUrl: "https://locals-only-service.herokuapp.com"
});

module.exports = Constants;
