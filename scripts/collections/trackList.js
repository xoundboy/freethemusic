var _ = require('underscore');
var RecordingModel = require('../models/recording.js');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,

    initialize: function(options){
        _.extend(this, _.pick(options, "idArray"));
        this.listenTo(X7.models.player, 'playing stop', this.setCurrentlyPlayingTrack);
    },

    populateByRecordingsArray: function(recordingsArray){
        _.each(recordingsArray, this.addModel.bind(this));
    },

    exportIdList: function(){
        return this.pluck("id").join(",");
    },

    addModel: function(recordingInfo){
        var newModel = new RecordingModel(recordingInfo);
        this.add(newModel);
    },

    delete: function(recID){
        this.remove(this.get(recID));
    },

    setCurrentlyPlayingTrack: function(id){
        this.invoke('set', {"currentlyPlaying": false});
        if (id) {
            var track = this.get(id);
            if (track){
                track.set("currentlyPlaying", true);
            }
        }
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

    reorder: function(id, oldIndex, newIndex, playlistModel){
        var modelToMove = this.remove(id, {silent: true});
        this.add(modelToMove, {at: newIndex});
        playlistModel.setTrackList(this.pluck('id'));
    }
});
