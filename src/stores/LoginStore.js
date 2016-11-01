import $ from 'jquery';
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('./Constants');

let baseUrl = Constants.baseUrl + "/users";

var LoginStore = assign({}, EventEmitter.prototype, {
  addUser: function(user, pass) {
    return $.post(baseUrl, {user: user, password: pass});
  }
});

module.exports = LoginStore;
