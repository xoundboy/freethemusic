var _ = require('underscore');
var $ = jQuery = require('jquery');
var Mustache = require('mustache');
require('jquery-ui/sortable');
require('jquery-ui-touch-punch');
var utils = require('../../utils.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "queueContent",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(adminApp.models.player, 'change loaded', this.render);
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
        adminApp.models.player.load(this.collection.get(id));
        adminApp.models.player.play();
    },

    selectItem: function(e){
        this.$el.find("tr").removeClass("selectedItem");
        $(e.currentTarget).addClass("selectedItem");
    },

    pausePlayer: function(){
        adminApp.models.player.playPause();
    },

    remove: function(e) {
        var id = $(e.currentTarget).attr("data-recid");
        this.collection.removeTrackById(id);
    },

    styleButtons: function() {
        utils.styleButton(this.$el.find(".removeTrackFromQueueButton"), "ui-icon-close");
        utils.styleButton(this.$el.find(".queueItemPlayingButton"), "ui-icon-volume-on");
        utils.styleButton(this.$el.find(".queueItemPauseButton"), "ui-icon-pause");
        utils.styleButton(this.$el.find(".queueItemPlayButton"), "ui-icon-play");
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
        if (adminApp.models.player.get("isPlaying")){
            this.$el.find("tr").removeClass("currentlyPlaying");
            this.$el.find("tr:eq(" + this.collection.getCurrentModelIndex() + ")").addClass("currentlyPlaying");
        }
    },

    render: function() {
        var index = 0;
        var compiledTemplate = Mustache.to_html(this.template, {
            queue: this.collection.toJSON(),
            position: function() {
                return ++index;
            }
        });
        this.$el.html(compiledTemplate);
        this.highlightCurrentlyPlayingItem();
        this.styleButtons();
        this.sortablize();

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});

