var $ = require('jquery');
var _ = require('underscore');
var template = require('./html/trackList.html');
require('jquery-ui/sortable');
require('jquery-ui-touch-punch');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "trackList",

    initialize: function(options){
        this.playlistModel = options.playlistModel;
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
        return this;
    }
});