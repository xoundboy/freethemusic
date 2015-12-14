Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
var RecordingModel = require('../models/recording.js');
var localStorageKey = "x71-queue";

module.exports = Backbone.Collection.extend({

    model: RecordingModel,

    initialize: function(){
        var that = this;
        this.localStorage = new Backbone.LocalStorage(localStorageKey);
        this.on('update', function(){
            // localstorage adapter unfortunately doesn't save collections in
            // the correct order after they have been re-ordered so doing it manually
            window.localStorage.setItem(localStorageKey, that.pluck('id'));

            // adding tracks to the queue can affect the disabled state of the player buttons
            //adminApp.views.player.styleButtons();
        });
    },

    pushRecording: function(recording){
        var copyOfRecordingModel = recording.clone();
        this.push(copyOfRecordingModel);
        copyOfRecordingModel.save({silent: true});
    },

    removeRecording: function(id){
        var modelToRemove = this.remove(id);
        // need to manually remove the models from local storage as the adapter doesn't do it - a bit rubbish
        window.localStorage.removeItem(localStorageKey + "-" + id);
    },

    getNextTrack: function(){
        var recordingToRemove = this.shift();
        adminApp.collections.queueHistory.add(recordingToRemove);
        return this.at(0);
    },

    reorder: function(id, newIndex){

        // remove model with given id
        var modelToMove = this.remove(id, {silent: true});

        // re-insert it in the new position
        this.add(modelToMove, {
            at: newIndex
        });

        // TODO - re-ordering can affect the queue index

        modelToMove.save();
    }

});