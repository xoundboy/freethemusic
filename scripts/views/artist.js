var template = require('./html/artist.html');
var ArtistModel = require('../models/artist');
var TracklistView = require('./trackList');
var button = require('../helpers/button.js');
var PlaylistsTableView = require('./playlistsTable');

module.exports = Backbone.View.extend({

    tagName: "div",
    className: "artistDetails",

    initialize: function(options){
        this.model = new ArtistModel({
            id: options.id
        });
        this.model.selectTab(options.tab ? options.tab : "songs");
        this.model.fetch({success:this.render.bind(this)});
    },

    render: function() {
        this.$el.html(template(this.model.attributes));
        this.renderPlaylistsTable();
        this.renderRecordingsTable();
        this.delegateEvents();
        return this;
    },

    renderPlaylistsTable: function(){
        var playlistsTableView = new PlaylistsTableView({
            collection:this.model.get("playlists"),
            omitArtistColumn: true
        });
        this.$el.find("#playlistsTableContainer").html(playlistsTableView.render().el);
    },

    renderRecordingsTable: function(){
        var recordingsTableView = new TracklistView({
            collection:this.model.get("recordings"),
            omitArtistColumn: true
        });
        this.$el.find("#recordingsTableContainer").html(recordingsTableView.render().el);
    }
});