var TrackModel = require('../models/track.js');

module.exports = Backbone.Collection.extend({

    model: TrackModel,

    reorder: function(id, oldIndex, newIndex, playlistModel){
        var modelToMove = this.remove(id, {silent: true});
        this.add(modelToMove, {at: newIndex});
        playlistModel.setTrackList(this.pluck('id'));
    }
});