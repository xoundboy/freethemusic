require('jquery-ui-touch-punch');
require('jquery-ui/sortable');
var $ = require('jquery');
var _ = require('underscore');
var AddToListContextMenuView = require('./recordingAddMenu');
var button = require('../helpers/button');
var highlight = require('../helpers/highlight');
var template = require('./html/trackList.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "trackList",

    initialize: function(options){
        this.playlistModel = options.playlistModel;
        _.extend(this, _.pick(options, "omitArtistColumn"));
        highlight.collectionRow(options.highlightId, this.collection, 2000);
        //this.listenTo(X7.collections.tracklist, 'change', this.render);
        //this.listenTo(this.playlistModel, 'change', this.render);
        this.listenTo(this.collection, "change remove add sort", this.render.bind(this));
    },

    events: {
        "click .playButton": "play",
        "click .pauseButton": "pause",
        "click .removeTrackFromList": "remove",
        "click .add": "add",
        "click th": "sort"
    },

    sort: function(e) {
        var field = $(e.target).attr("bengrid-key");
        if (field) {
            this.collection.sortByField(field);
        }
    },

    add: function(e){
        e.stopPropagation();
        var $btn = $(e.currentTarget),
            recId = $btn.closest("tr").attr("data-recordingId");

        if (X7.adminUser){
            var $contextMenuContainer = $btn.parent().find(".listContextMenuContainer");
            var contextMenuView = new AddToListContextMenuView({
                collection: X7.collections.playlists.getFilteredCollection(this.playlistModel),
                modelToAdd: this.collection.get(recId)
            });
            $contextMenuContainer.html(contextMenuView.render().el);

        } else {
            X7.collections.queue.addModel(X7.collections.recordings.get(recId), this.onTrackAdded);
        }
    },

    play: function(e){
        var recordingId = $(e.currentTarget).closest("tr").attr("data-recordingid");
        var trackModel = this.collection.get(recordingId);
        X7.models.player.playPlaylistTrack(trackModel, this.collection);
    },

    pause: function(){
        X7.models.player.pause();
    },

    remove: function(e){
        var recId = $(e.currentTarget).closest("tr").attr("data-recordingid");
        this.collection.delete(recId);
        this.playlistModel.save();
    },

    styleButtons: function(){
        button.style(this.$el.find(".playButton"), "ui-icon-play");
        button.style(this.$el.find(".pauseButton"), "ui-icon-pause");
        button.style(this.$el.find(".removeTrackFromList"), "ui-icon-close");
        button.style(this.$el.find(".add"), "ui-icon-plusthick");
    },

    sortablize: function(){
        var that = this;
        var oldIndex;

        this.$el.find("tbody").sortable({
            axis: "y",
            placeholder: "ui-state-highlight",
            start: function(e, ui){
                oldIndex = ui.item.index();
            },
            stop: function(e, ui){
                var id = $(ui.item).attr("data-recordingid");
                var newIndex = ui.item.index();
                that.collection.reorder(id, oldIndex, newIndex, that.playlistModel);
            }
        });
        this.$el.find("tbody").disableSelection();
    },

    render: function(){
        if (this.collection){
            var viewModel = {
                trackList: this.collection.toJSON(),
                adminUser: X7.adminUser,
                omitArtistColumn: this.omitArtistColumn
            };
            this.$el.html(template(viewModel));
            this.sortablize();
            this.styleButtons();
        }
        this.delegateEvents();
        return this;
    }
});
