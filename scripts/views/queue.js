var _ = require('underscore');
var $ = require('jquery');

require('jquery-ui/sortable');
require('jquery-ui-touch-punch');
var button = require('../helpers/button.js');
var template = require('./html/queue.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "queueContent",

    initialize: function () {
        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(X7.models.player, 'change loaded', this.render);
        this.collection.fetch();
    },

    events: {
        "click .removeTrackFromQueueButton": "remove",
        "click .queueItemPauseButton": "pausePlayer",
        "click .queueItemPlayButton": "playTrackNow",
        "click tr": "selectItem"
    },

    playTrackNow: function(e){
        var $row = $(e.currentTarget).closest("tr");
        var id = $row.attr("data-id");
        X7.models.player.load(this.collection.get(id));
        X7.models.player.play();
    },

    selectItem: function(e){
        this.$el.find("tr").removeClass("selectedItem");
        $(e.currentTarget).addClass("selectedItem");
    },

    pausePlayer: function(){
        X7.models.player.playPause();
    },

    remove: function(e) {
        var id = $(e.currentTarget).attr("data-recid");
        this.collection.removeTrackById(id);
    },

    styleButtons: function() {
        button.style(this.$el.find(".removeTrackFromQueueButton"), "ui-icon-close");
        button.style(this.$el.find(".queueItemPlayingButton"), "ui-icon-volume-on");
        button.style(this.$el.find(".queueItemPauseButton"), "ui-icon-pause");
        button.style(this.$el.find(".queueItemPlayButton"), "ui-icon-play");
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
                var id = $(ui.item).attr("data-id");
                var newIndex = ui.item.index();
                that.collection.reorder(id, oldIndex, newIndex);
            }
        });
        this.$el.find("tbody").disableSelection();
    },

    highlightCurrentlyPlayingItem: function(){
        if (X7.models.player && X7.models.player.isPlaying()){
            this.$el.find("tr").removeClass("currentlyPlaying");
            this.$el.find("tr:eq(" + this.collection.getCurrentModelIndex() + ")").addClass("currentlyPlaying");
        }
    },

    render: function() {
        var index = 0;
        this.$el.html(template({
            queue: this.collection.toJSON(),
            position: function() {
                return ++index;
            }
        }));
        this.highlightCurrentlyPlayingItem();
        this.styleButtons();
        this.sortablize();

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});

