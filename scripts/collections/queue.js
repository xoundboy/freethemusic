Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
var RecordingModel = require('../models/recording.js');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,

    initialize: function(options){
        var that = this;
        this.localStorage = new Backbone.LocalStorage(options.localStorageKey)
        this.on('update', function(){
            // localstorage adapter unfortunately doesn't save collections in
            // the correct order after they have been re-ordered so doing it manually
            window.localStorage.setItem(options.localStorageKey, that.pluck('id'));
        });
    },

    // TODO - remove models from local storage when they are removed from the collection

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