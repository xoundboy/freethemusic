var $ = require('jquery');
var template = require('./html/playlist.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlist",

    initialize: function (options) {
        this.model = X7.collections.playlists.get(options.id);
    },

    render: function() {
        this.$el.html(template(this.model.attributes));

        //this.styleButtons();

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});