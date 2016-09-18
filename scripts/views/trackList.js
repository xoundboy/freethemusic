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
    },

    events: {
        "click .playButton": "play",
        "click .removeTrackFromList": "remove"
    },

    play: function(){
        // TODO call play method on parent playlist
    },

    remove: function(e){
        var trackIndex = $(e.currentTarget).closest("tr").index();
        console.log(trackIndex);
        this.playlistModel.removeTrackByIndex(trackIndex);
    },

    styleButtons: function(){
        button.style(this.$el.find(".playButton"), "ui-icon-play");
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
        this.$el.html(template({trackList: this.collection.toJSON()}));
        this.sortablize();
        this.styleButtons();
        return this;
    }
});