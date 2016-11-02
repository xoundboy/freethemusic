var $ = require('jquery');
var Backbone = require('backbone');
var button = require('../helpers/button.js');
var template = require('./html/playlists.html');
var PlaylistTableView = require('./playlistsTable');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlistsContent",
    className: "playlists",
    selectedId: null,

    initialize: function () {
        this.listenTo(this.collection, 'reset sort remove fetch change', this.render);
    },

    events: {
        "click a[href=#playlist]" : "add",
        "click .addPlaylistButton": "add"
    },

    add: function(){
        X7.router.navigate("playlist/add", {trigger: true});
    },

    styleButtons: function() {
        button.style(this.$el.find(".addPlaylistButton"), "ui-icon-plusthick", true);
    },

    render: function(){
        this.$el.html(template({adminUser: X7.adminUser}));
        this.styleButtons();
        this.renderTable();
        this.delegateEvents();
        return this;
    },

    renderTable: function(){
        var playlistTableView = new PlaylistTableView({collection: this.collection});
        this.$el.find("#playlistTableContainer").html(playlistTableView.render().el);
    }
});