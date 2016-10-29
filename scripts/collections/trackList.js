var _ = require('underscore');
var TrackModel = require('../models/track.js');

module.exports = Backbone.Collection.extend({

    model: TrackModel,

    initialize: function(options){
        _.extend(this, _.pick(options, "idArray"));
        this.listenTo(X7.models.player, 'playing stop', this.setCurrentlyPlayingTrack);
    },

    populateByIdArray: function(idArray){
        _.each(idArray, this.addModelById.bind(this));
    },

    addModelById: function(id){
        this.add(X7.collections.recordings.get(id, {silent:true}));
    },

    //save: function(){
    //    var idArray = this.pluck("id");
    //    X7.models.playlist.setTrackList(idArray);
    //},

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