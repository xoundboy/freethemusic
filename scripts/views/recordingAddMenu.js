var _ = require('underscore');
var template = require('./html/recordingAddMenu.html');

module.exports = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, _.pick(options, "recordingId"));
    },

    events: {
        "click .addToQueueLink" : "addToQueue",
        "click .addToListLink": "addToPlaylist"
    },

    addToQueue: function(){
        X7.collections.queue.addModel(
            X7.collections.recordings.get(this.recordingId)
        );
    },

    addToPlaylist: function(e){
        var playlistId = $(e.target).attr("data-id");
        var chosenPlaylistModel = X7.collections.playlists.get(playlistId);
        var chosenTrack = X7.collections.recordings.get(this.recordingId);
        chosenPlaylistModel.addTrack(chosenTrack);
    },

    render: function(){
        this.$el.html(template({playlists:this.collection.toJSON()}));
        return this;
    }
});