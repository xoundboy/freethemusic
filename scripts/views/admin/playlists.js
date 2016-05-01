var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');
var button = require('../../helpers/button.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlistsContent",
    className: "playlists",
    selectedId: null,

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
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
        adminApp.routers.main.navigate('playlist/edit/' + playlistID, {trigger:true});
    },

    add: function(){
        adminApp.routers.main.navigate("playlist/add", {trigger: true});
    },

    styleButtons: function() {
        button.style(this.$el.find(".editPlaylistButton"), "ui-icon-pencil");
        button.style(this.$el.find(".deletePlaylistButton"), "ui-icon-trash");
        button.style(this.$el.find(".addPlaylistButton"), "ui-icon-plusthick", true);
    },

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, { playlists: this.collection.toJSON()});
        this.$el.html(compiledTemplate);

        this.styleButtons();

        this.delegateEvents();

        return this;
    }
});