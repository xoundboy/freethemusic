﻿
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    el: "#navContainer",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
    },

    events: {
        "click .goBack": "goBack",
        "click .goForward": "goForward"
    },

    goBack: function(){
        Backbone.history.history.back();
    },

    goForward: function(){
        Backbone.history.history.forward();
    },

    styleButtons: function(){
        this.$el.find(".goForward").button({
            text: false,
            icons: {
                primary: "ui-icon-arrowthick-1-e"
            }
        });
        this.$el.find(".goBack").button({
            text: false,
            icons: {
                primary: "ui-icon-arrowthick-1-w"
            }
        });
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, {});
        this.$el.html(compiledTemplate);
        this.styleButtons();
        return this;
    }
});