var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "queuePage",

    initialize: function (options) {

        _.extend(this, _.pick(options, "template"));

    },

    render: function(){
        this.$el.html(this.template);

        // render the three subviews
        this.$el.find("#queuePlayerContainer").html(X7.views.queuePlayer.render().el);
        this.$el.find("#queueContainer").html(X7.views.queue.render().el);

        return this;
    }
});

