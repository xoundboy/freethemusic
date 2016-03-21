/**
 * Created by xoundboy on 20/03/16.
 */
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingDetails",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
    },

    render: function() {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        //this.styleButtons();

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});