/**
 * Created by xoundboy on 25/03/16.
 */
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "galleryImages",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
    },

    render: function() {

        this.$el.html(Mustache.to_html(this.template, {images:this.collection.toJSON()}));

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});