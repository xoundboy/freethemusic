Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
var RecordingModel = require('../models/recording.js');

var localStorageKey = "x7-queue-history";

module.exports = Backbone.Collection.extend({

    model: RecordingModel,
    localStorage: new Backbone.LocalStorage(localStorageKey),

    initialize: function(){

    },

    add: function(oldRecording){

        this.unshift(oldRecording);
        oldRecording.save();
    }


});