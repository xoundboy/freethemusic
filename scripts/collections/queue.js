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

    getNextTrack: function(){
        var recordingToRemove = this.shift();
        adminApp.collections.queueHistory.add(recordingToRemove);
        return this.at(0);
    },

    removeTrackById: function(id){

        var indexToRemove, queueIndex, diff;

        // Manually remove the models from local storage as the adapter doesn't :/
        window.localStorage.removeItem(localStorageKey + "-" + id);

        // queue index may be affected
        indexToRemove = this.indexOf(this.get(id));
        queueIndex = adminApp.views.player.getQueueIndex();

        // Remove the model
        this.remove(id);

        // special case: last remaining model
        if (indexToRemove === 0 && this.length === 0) {

            // leave the queue index at zero

        } else {

            diff = indexToRemove - queueIndex;

            if (diff === 0) {
                adminApp.views.player.setQueueIndex(queueIndex - 1);
                adminApp.views.player.skipForward();
            } else if (diff < 0) {
                adminApp.views.player.setQueueIndex(queueIndex - 1);
            }
        }
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