var $ = require('jquery');
var template = require('./html/playlist.html');
var PlaylistModel = require('../models/playlist.js');
var TrackListCollection = require('../collections/trackList.js');
var TrackListView = require('../views/trackList.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlist",

    initialize: function (options) {

        this.model = new PlaylistModel({
            id: options.id
        });

        this.model.fetch({success: $.proxy(this.onPlaylistModelFetched, this)});
    },

    onPlaylistModelFetched: function(model, response){

        var idList = JSON.parse(response[0][0]["trackList"]);
        var trackListCollection = new TrackListCollection(this.makeCollectionFromIdList(idList));
        this.model.set("trackList", trackListCollection);

        this.trackListCollectionView = new TrackListView({
            collection: trackListCollection
        });
        this.render();

    },

    makeCollectionFromIdList: function(idList){

        var selected = [];
        for (var i in idList)
            selected.push(X7.collections.recordings.get(idList[i]));
        return selected;
    },

    render: function() {
        console.log("rendering playlist view");
        console.log(this.model);
        this.$el.html(template(this.model.attributes));
        this.renderTrackList();
        //this.styleButtons();

        // sub-views need this
        this.delegateEvents();
        return this;
    },

    renderTrackList: function(){
        if (this.trackListCollectionView){
            this.$el.find("#trackListContainer").html(this.trackListCollectionView.render().el);
        }
    }

});