var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistsContent",
    className: "artists",
    selectedId: null,

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'reset sort change remove', this.render);
        this.collection.fetch({reset:true});
    },

    events: {
        "click button.addArtistButton": "addArtist"
    },

    addArtist: function(){
        alert("hey");
    },

    styleButtons: function() {
        this.$el.find(".editArtistButton").button({
            text: false,
            icons: {
                primary: "ui-icon-pencil"
            }
        });
        this.$el.find(".deleteArtistButton").button({
            text: false,
            icons: {
                primary: "ui-icon-trash"
            }
        });
        this.$el.find(".addArtistButton").button({
            icons: {
                primary: "ui-icon-plusthick"
            }
        });
    },

    render: function(){
        console.log("rendering artists collection");
        var compiledTemplate = Mustache.to_html(this.template, { artists: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        this.styleButtons();
        return this;
    }
});
