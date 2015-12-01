//require('jquery-ui/button');
//var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');


module.exports = Backbone.View.extend({

    tagName: "div",
    id: "searchPanel",
    className: "searchPanel",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    events: {
        "click #emptyPlayerSearchButton": "search"
    },

    search: function () {
        alert("searching");
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        // sub-views need this
        this.delegateEvents();

        return this;
    }
});