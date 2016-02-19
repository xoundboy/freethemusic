Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
var RecordingModel = require('../models/recording.js');
var config = require('../config.js');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,

    initialize: function(){
        var that = this;
        this.localStorage = new Backbone.LocalStorage(config.LS_QUEUE);
        this.on('update', function(){

            // localstorage adapter unfortunately doesn't save collections in
            // the correct order after they have been re-ordered so doing it manually
            window.localStorage.setItem(config.LS_QUEUE, that.pluck('id'));

            // adding tracks to the queue can affect the disabled state of the player buttons
            //adminApp.views.player.styleButtons();

        });
    },

    getQueueIndex: function(){
        return window.localStorage.getItem(config.LS_CURRENTLY_PLAYING_INDEX);
    },

    setQueueIndex: function(newIndex){
        window.localStorage.setItem(config.LS_CURRENTLY_PLAYING_INDEX, newIndex);
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
        window.localStorage.removeItem(config.LS_QUEUE + "-" + id);

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

    reorder: function(id, oldIndex, newIndex){

        // remove model with given id
        var modelToMove = this.remove(id, {silent: true});

        // re-insert it in the new position
        this.add(modelToMove, {
            at: newIndex
        });

        // currently playing track's index
        var cpti = parseInt(this.getQueueIndex());

        // scenario 1: moved track is currently playing track (CPT)
        if (oldIndex === cpti) {
            this.setQueueIndex(newIndex);
        }

        // scenario 2: track moves from after CPT to before CPT
        else if (oldIndex > cpti && newIndex <= cpti) {
            this.setQueueIndex(cpti + 1);
        }

        // scenario 3: track moves from before CPT to after CPT
        else if (oldIndex < cpti && newIndex >= cpti){
            this.setQueueIndex(cpti - 1);
        }

        this.trigger("queueReordered");

        modelToMove.save();
    },

    forcePlay: function(index, modelId) {
        this.setQueueIndex(index);
        adminApp.models.player.play();
    }
});