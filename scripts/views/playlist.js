var $ = require('jquery');
var template = require('./html/playlist.html');
var PlaylistModel = require('../models/playlist.js');
var TrackListCollection = require('../collections/trackList.js');
var TrackListView = require('../views/trackList.js');
var button = require('../helpers/button.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlist",

    initialize: function (options) {
        this.model = new PlaylistModel({
            id: options.id
        });

        this.model.fetch({success: $.proxy(this.onPlaylistModelFetched, this)});
    },

    events: {
        "click .playButton": "play",
        "click #editPlaylist": "edit"
    },

    edit: function(){
        X7.router.navigate("playlist/edit/" + this.model.get("id"), {trigger: true});
    },

    play: function(e){
        var recordingId = $(e.currentTarget).closest("tr").attr("data-recordingId");
        X7.models.player.load(X7.collections.recordings.get(recordingId), true);
    },

    onPlaylistModelFetched: function(model, response){
        var modelFromDb = response;
        modelFromDb.trackList = new TrackListCollection(this.collectionFromIdList(JSON.parse(modelFromDb.trackList)));

        this.model.set(modelFromDb);

        this.trackListCollectionView = new TrackListView({
            collection: modelFromDb.trackList
        });

        this.render();
    },

    collectionFromIdList: function(idList){
        var selected = [];
        for (var i in idList)
            selected.push(X7.collections.recordings.get(idList[i]));
        return selected;
    },

    styleButtons: function(){
        button.style(this.$el.find(".playButton"), "ui-icon-play");
        button.style(this.$el.find("#editPlaylist"), "ui-icon-pencil");
    },

    render: function() {
        this.$el.html(template(this.model.attributes));
        this.renderTrackList();
        this.styleButtons();
        this.delegateEvents();
        return this;
    },

    renderTrackList: function(){
        if (this.trackListCollectionView){
            this.$el.find("#trackListContainer").html(this.trackListCollectionView.render().el);
        }
    }

});