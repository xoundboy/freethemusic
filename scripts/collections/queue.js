Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
var RecordingModel = require('../models/recording.js');

var localStorageKey = "x7-queue";

module.exports = Backbone.Collection.extend({

    model: RecordingModel,
    localStorage: new Backbone.LocalStorage(localStorageKey),

    initialize: function(){
        var that = this;
        this.on('update', function(){
            // localstorage adapter unfortunately doesn't save collections in
            // the correct order after they have been re-ordered so doing it manually
            window.localStorage.setItem(localStorageKey, that.pluck('id'));
        });
    },

    // TODO - remove models from local storage when they are removed from the collection


    addRecording: function(recording, position){
        this.add(recording, {at: position});
    },

    pushRecording: function(recording){
        var copyOfRecordingModel = recording.clone();
        this.push(copyOfRecordingModel);
        copyOfRecordingModel.save();
    },

    reorder: function(id, newIndex){

        // remove model with given id
        var modelToMove = this.remove(id, {silent: true});

        // re-insert it in the new position
        this.add(modelToMove, {
            at: newIndex
        });

        modelToMove.save();
    }

});