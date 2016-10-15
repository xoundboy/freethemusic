Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
var RecordingModel = require('../models/recording.js');
var config = require('../config.js');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,

    initialize: function(){
        this.localStorage = new Backbone.LocalStorage(config.LS_QUEUE);
        this.on('update', $.proxy(this.saveToLocalStorage, this));
    },

    saveToLocalStorage: function(){
        // localstorage adapter unfortunately doesn't save collections in
        // the correct order after they have been re-ordered so doing it manually
        window.localStorage.setItem(config.LS_QUEUE, this.pluck('id'));
    },

    getCurrentModel: function(){
        return this.get(window.localStorage.getItem(config.LS_PLAYER_LOADED_ID));
    },

    getCurrentModelIndex: function(){
        return (this.indexOf(this.getCurrentModel()));
    },

    addModel: function(recording, callback){
        var copyOfRecordingModel = recording.clone();
        this.push(copyOfRecordingModel);
        copyOfRecordingModel.save({silent: true}, {success:callback});
    },

    nextModel: function(currentModel){
        var currentIndex = this.indexOf(currentModel);
        if (this.length > currentIndex){
            return this.at(currentIndex + 1);
        }
    },

    previousModel: function(currentModel){
        var currentIndex = this.indexOf(currentModel);
        if (currentIndex > 0) {
            return this.at(currentIndex - 1);
        }
    },

    removeTrackById: function(id){

        var pm = X7.models.player;

        // removing the currently playing track
        if (pm.getLoadedModelId() === id) {

            // this was not the last in the collection, move forward
            if (this.indexOf(this.get(id)) < (this.length -1)) {
                pm.loadNext();
            } else {
                pm.loadPrevious();
            }
            pm.pause();
        }

        this.remove(id);

        if (!this.length){
            pm.unLoad();
            pm.waitForTrackToBeAdded();
        }

        // Manually remove the model from local storage as the adapter doesn't :/
        window.localStorage.removeItem(config.LS_QUEUE + "-" + id);
    },

    reorder: function(id, oldIndex, newIndex){
        var modelToMove = this.remove(id, {silent: true});
        this.add(modelToMove, {
            at: newIndex
        });
        modelToMove.save();
    }
});