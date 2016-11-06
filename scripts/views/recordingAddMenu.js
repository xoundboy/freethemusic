var _ = require('underscore');
var template = require('./html/recordingAddMenu.html');
var $ = require('jquery');

module.exports = Backbone.View.extend({

    initialize: function(options){
        //_.extend(this, _.pick(options, "recordingId"));
        _.extend(this, _.pick(options, "modelToAdd"));
    },

    events: {
        "click .addToQueueLink" : "addToQueue",
        "click .addToListLink": "addToPlaylist"
    },

    addToQueue: function(){
        X7.collections.queue.addModel(this.modelToAdd);
    },

    addToPlaylist: function(e){
        var playlistId = $(e.target).attr("data-id");
        var chosenPlaylistModel = X7.collections.playlists.get(playlistId);
        chosenPlaylistModel.addTrack(this.modelToAdd, this.onTrackAddedToPlaylist);
    },

    onTrackAddedToPlaylist: function(){
        // todo show a notification
    },

    render: function(){
        this.$el.html(template({playlists:this.collection.toJSON()}));
        return this;
    }
});
