import $ from 'jquery';
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

let baseUrl = "https://locals-only-service.herokuapp.com/trails";

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
  }
});

module.exports = StashStore;
