var $ = require('jquery');
var _ = require('underscore');
var template = require('./html/trackList.html');
require('jquery-ui/sortable');
require('jquery-ui-touch-punch');
var button = require('../helpers/button.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "trackList",

    initialize: function(options){
        this.playlistModel = options.playlistModel;
        this.listenTo(X7.collections.tracklist, 'change', this.render);
        this.listenTo(this.playlistModel, 'change', this.render);
    },

    events: {
        "click .playButton": "play",
        "click .pauseButton": "pause",
        "click .removeTrackFromList": "remove"
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
        this.playlistModel.removeTrack(recId);
    },

    styleButtons: function(){
        button.style(this.$el.find(".playButton"), "ui-icon-play");
        button.style(this.$el.find(".pauseButton"), "ui-icon-pause");
        button.style(this.$el.find(".removeTrackFromList"), "ui-icon-close");
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
        var viewModel = {
            trackList: this.collection.toJSON(),
            adminUser: X7.adminUser
        };
        this.$el.html(template(viewModel));
        this.sortablize();
        this.styleButtons();
        this.delegateEvents();
        return this;
    }
});