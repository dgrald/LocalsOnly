import $ from 'jquery';
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('./Constants');

let baseUrl = Constants.baseUrl + "/trails";

var StashStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return $.ajax(baseUrl, {
              type : 'GET',
            });
  },
  addStash: function(stash) {
    return $.ajax(baseUrl, {
        data : JSON.stringify(stash),
        contentType : 'application/json',
        type : 'POST',
      });
  },
  deleteStash: function(stash) {
    return $.ajax(baseUrl + "/" + stash.id, {
      type: 'DELETE'
    });
  }
});

module.exports = StashStore;
