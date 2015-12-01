Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
//var RecordingModel = require('../models/recording.js');

var localStorageKey = "x7-player";

module.exports = Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage(localStorageKey),

    initialize: function(){

        var that = this;

        this.fetch();

        // no track found in local storage
        if (!this.get("audioFile")) {

            // queue empty
            if (!adminApp.collections.queue.length) {

                // when something gets added to the queue..
                this.listenTo(adminApp.collections.queue, 'add', function () {

                    // load it straight away
                    that.loadNextTrackFromQueue();

                    // and stop waiting for something to be added to the queue
                    that.stopListening(adminApp.collections.queue, 'add');
                });

            } else {
                that.loadNextTrackFromQueue();
            }
        }
    },

    loadNextTrackFromQueue: function(){
        if (this.get("audioFile")) {
            this.saveCurrentTrackToHistory();
        }
        var recording = adminApp.collections.queue.at(0);
        this.load(recording.clone());
        recording.destroy();
    },

    saveCurrentTrackToHistory: function(){
        var oldRecording = this.clone();
        oldRecording.set("id", oldRecording.get("originalId"));
        adminApp.collections.queueHistory.add(oldRecording);
    },

    load: function(recording){

        // save the recordings id as 'originalId'
        recording.set("originalId", recording.get("id"));

        // set the recording's id to 1
        recording.set("id", 1);

        // load the modified recording
        this.set(recording.attributes);

        // save it in local storage
        this.save();
    }


});