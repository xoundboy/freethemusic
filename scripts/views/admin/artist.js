/**
 * Created by xoundboy on 17/03/16.
 */
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistDetails",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
    },

    renderImages: function(images){
        this.$el.find("#artistImagesContainer").html(Mustache.to_html(
            $("#template_artistImages").html(),
            {images: images.toJSON()}
        ));
    },

    render: function() {
        this.$el.html(Mustache.to_html(this.template, this.model.attributes));

        var images = this.model.get("images");
        if (images.length){
            this.renderImages(images);
        }

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});