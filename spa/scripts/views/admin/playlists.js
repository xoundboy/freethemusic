var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

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

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, { playlists: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        return this;
    }
});