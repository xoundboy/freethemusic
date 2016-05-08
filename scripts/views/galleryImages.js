/**
 * Created by xoundboy on 25/03/16.
 */
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var ImageModel = require("../models/image.js");
var template = require('./html/galleryImages.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "galleryImages",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'reset add change', this.render);
    },

    render: function() {

        this.$el.html(template({images:this.collection.toJSON()}));

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});