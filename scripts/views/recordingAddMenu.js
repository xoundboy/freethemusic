var _ = require('underscore');
var template = require('./html/recordingAddMenu.html');
var $ = require('jquery');
var notification = require('../helpers/notification');

module.exports = Backbone.View.extend({

    initialize: function(options){
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
        this.playlistName = chosenPlaylistModel.get("name");
        chosenPlaylistModel.addTrack(this.modelToAdd, this.onTrackAddedToPlaylist.bind(this));
    },

    onTrackAddedToPlaylist: function(){
        // todo show a notification
        notification.create({
            message:"'"+ this.modelToAdd.get("title") + "' added to '" + this.playlistName + "' playlist",
            autohide: true,
            duration: 2000
        });
    },

    render: function(){
        this.$el.html(template({playlists:this.collection.toJSON()}));
        return this;
    }
});
