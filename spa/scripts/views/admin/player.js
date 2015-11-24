var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    el: "#playerContainer",
    tagName: "div",
    id: "player",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        return this;
    }
});
