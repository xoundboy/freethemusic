var template = require('./html/artists.html');
var ArtistsTableView = require('../views/artistsTable');
var _ = require('underscore');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistsContent",
    className: "artists",
    highlightId: null,

    initialize: function (options) {
        _.extend(this, _.pick(options, "highlightId"));
    },

    events: {
        "click button.addArtistButton": "add"
    },

    add: function(){
        X7.router.navigate("artist/add", {trigger: true});
    },

    styleButtons: function() {
        this.$el.find(".addArtistButton").button({icons:{primary:"ui-icon-plusthick"}});
    },

    render: function(){
        this.$el.html(template({adminUser: X7.adminUser}));
        this.styleButtons();
        this.renderArtistsTable();
        this.delegateEvents();
        return this;
    },

    renderArtistsTable: function(){
        var artistsTableView = new ArtistsTableView({
            collection:this.collection,
            highlightId:this.highlightId
        });
        this.$el.find("#artistsTableContainer").html(artistsTableView.render().el);
    }
});
