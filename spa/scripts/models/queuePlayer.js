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
                this.listenTo(adminApp.collections.queue, 'change', function () {

                    // load it straight away
                    that.loadNextFromQueue();

                    // and stop waiting for something to be added to the queue
                    that.stopListening(adminApp.collections.queue, 'change');
                });

            } else {
                that.loadNextFromQueue();
            }
        }
    },

    loadNextFromQueue: function(){
        var recording = adminApp.collections.queue.at(0);
        this.load(recording.clone());
        recording.destroy();
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