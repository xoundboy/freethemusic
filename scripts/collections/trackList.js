var TrackModel = require('../models/track.js');

module.exports = Backbone.Collection.extend({

    model: TrackModel,

    initialize: function(){
        this.listenTo(X7.models.player, 'playing stop', this.setCurrentlyPlayingTrack);
    },

    setCurrentlyPlayingTrack: function(id){
        this.invoke('set', {"currentlyPlaying": false});
        if (id) this.get(id).set("currentlyPlaying", true);
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