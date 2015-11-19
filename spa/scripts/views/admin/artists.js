var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistsContent",
    className: "artists",
    selectedId: null,

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'reset sort remove fetch change', this.render);
        this.collection.fetch();
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
    },

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, { artists: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        this.styleButtons();
        return this;
    }
});
