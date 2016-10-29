var $ = require('jquery');
var template = require('./html/playlist.html');
var button = require('../helpers/button');
var TracklistView = require('./trackList');
var TrackListCollection = require('../collections/trackList');
var PlaylistModel = require('../models/playlist');
var utils = require('../helpers/commonUtils');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlist",

    events: {
        "click #editPlaylist": "edit",
        "click #playPlaylist": "playFromTop"
    },

    initialize: function(options){
        this.model = new PlaylistModel({id: options.id});
        this.model.fetch({success:this.render.bind(this)});
        //this.listenTo(X7.collections.tracklist, 'reset', this.render);
    },

    edit: function(){
        X7.router.navigate("playlist/edit/" + this.model.get("id"), {trigger: true});
    },

    playFromTop: function(){
        X7.models.player.connectToTracklist(this.model.get("trackList"), true);
    },

    styleButtons: function(){
        button.style(this.$el.find("#playPlaylist"), "ui-icon-play");
        button.style(this.$el.find("#editPlaylist"), "ui-icon-pencil");
    },

    render: function() {
        this.model.set("adminUser", X7.adminUser);
        this.$el.html(template(this.model.attributes));
        this.styleButtons();
        this.renderTrackList();
        this.delegateEvents();
        return this;
    },

    renderTrackList: function() {
        var idArray = this.model.get("trackList");
        if (idArray.length){
            var collection = new TrackListCollection();
            collection.populateByIdArray(idArray);
            var tracklistView = new TracklistView({
                collection: collection,
                playlistModel: this.model
            });
            this.$el.find("#trackListContainer").html(tracklistView.render().el);
        }
    }
});