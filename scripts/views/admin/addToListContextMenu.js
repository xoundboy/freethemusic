var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');


module.exports = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, _.pick(options, "recordingId"));
        this.template = $("#template_addToListContextMenu").html();
    },

    events: {
        "click .addToQueueLink" : "addToQueue",
        "click .addToListLink": "addToPlaylist"
    },

    addToQueue: function(){
        adminApp.collections.queue.addModel(
            adminApp.collections.recordings.get(this.recordingId)
        );
    },

    addToPlaylist: function(e){
        var playlistId = $(e.target).attr("data-id");
        var chosenPlaylistModel = adminApp.collections.playlists.get(playlistId);
        var chosenTrack = adminApp.collections.recordings.get(this.recordingId);
        chosenPlaylistModel.addTrack(chosenTrack);
    },

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, { playlists: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        return this;
    }

});