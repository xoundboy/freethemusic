var _ = require('underscore');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    id: "artistEditContent",
    className: "addOrEditPanel",

    initialize: function(options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        return this;
    }
});