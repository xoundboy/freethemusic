var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var button = require('../helpers/button.js');
var template = require('./html/playlistsTable.html');

module.exports = Backbone.View.extend({

    tagName: "div",

    initialize: function (options){
        _.extend(this, _.pick(options, "omitArtistColumn"));
    },

    events: {
        "click .deletePlaylistButton": "delete",
        "click .editPlaylistButton": "edit"
    },

    delete: function(e){
        if (confirm("Are you sure?")){
            var $btn = $(e.currentTarget),
                playlistId = $btn.closest("tr").attr("data-playlistId");
            var modelToDelete = this.collection.get(playlistId);
            this.collection.remove(modelToDelete);
        }
    },

    edit: function(e){
        var playlistID = $(e.currentTarget).closest("tr").attr("data-playlistId");
        X7.router.navigate('playlist/edit/' + playlistID, {trigger:true});
    },

    styleButtons: function() {
        button.style(this.$el.find(".editPlaylistButton"), "ui-icon-pencil");
        button.style(this.$el.find(".deletePlaylistButton"), "ui-icon-trash");
    },

    render: function(){
        if (this.collection){
            var viewModel = {
                adminUser: X7.adminUser,
                playlists: this.collection.toJSON(),
                omitArtistColumn: this.omitArtistColumn
            };
            this.$el.html(template(viewModel));
            this.styleButtons();
        }
        this.delegateEvents();
        return this;
    }
});