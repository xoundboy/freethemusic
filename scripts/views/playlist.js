var $ = require('jquery');
var template = require('./html/playlist.html');
var button = require('../helpers/button.js');
var TracklistView = require('./trackList.js');
var PlaylistModel = require('../models/playlist.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlist",

    events: {
        "click #editPlaylist": "edit",
        "click #playPlaylist": "playFromTop"
    },

    initialize: function(){
        this.listenTo(X7.collections.tracklist, 'reset', this.render);
    },

    loadModel: function(id){
        this.model = new PlaylistModel({id:id});
        this.model.fetch({success: $.proxy(this.createTrackList, this)});
    },

    createTrackList: function(){
        X7.collections.tracklist.load(JSON.parse(this.model.get("trackList")));
        X7.views.tracklist = new TracklistView({
            collection: X7.collections.tracklist,
            playlistModel: this.model
        });
        this.render();
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
        this.model.set("adminUser",X7.adminUser);
        this.$el.html(template(this.model.attributes));
        var j$ = X7.views.tracklist.render().el;
        this.$el.find("#trackListContainer").html(j$);
        this.styleButtons();
        this.delegateEvents();
        return this;
    }
});