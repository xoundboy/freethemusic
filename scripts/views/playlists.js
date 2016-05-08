var $ = require('jquery');
var Backbone = require('backbone');
var button = require('../helpers/button.js');
var template = require('./html/playlists.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlistsContent",
    className: "playlists",
    selectedId: null,

    initialize: function () {
        this.listenTo(this.collection, 'reset sort remove fetch change', this.render);
        this.collection.fetch();
    },

    events: {
        "click .deletePlaylistButton": "delete",
        "click .editPlaylistButton": "edit",
        "click a[href=#playlist]" : "add",
        "click .addPlaylistButton": "add"
    },

    delete: function(e){
        var $btn = $(e.currentTarget),
            playlistId = $btn.closest("tr").attr("data-playlistId");

        // TODO implement "are you sure?" dialog
        var modelToDelete = this.collection.get(playlistId);
        this.collection.remove(modelToDelete);
    },

    edit: function(e){
        var playlistID = $(e.currentTarget).closest("tr").attr("data-playlistId");
        X7.router.navigate('playlist/edit/' + playlistID, {trigger:true});
    },

    add: function(){
        X7.router.navigate("playlist/add", {trigger: true});
    },

    styleButtons: function() {
        button.style(this.$el.find(".editPlaylistButton"), "ui-icon-pencil");
        button.style(this.$el.find(".deletePlaylistButton"), "ui-icon-trash");
        button.style(this.$el.find(".addPlaylistButton"), "ui-icon-plusthick", true);
    },

    render: function(){
        this.$el.html(template({playlists:this.collection.toJSON()}));

        this.styleButtons();

        this.delegateEvents();

        return this;
    }
});