/**
 * Created by xoundboy on 17/03/16.
 */
var $ = require('jquery'),
    Mustache = require('mustache');

var template = require('./html/artist.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistDetails",

    render: function() {
        this.$el.html(template(this.model.attributes));
        this.renderImages();
        this.delegateEvents();
        return this;
    },

    renderImages: function(){
        var images = this.model.get("images");
        if (images && images.length) {
            this.$el.find("#artistImagesContainer").html(Mustache.to_html(
                $("#template_artistImages").html(),
                {images: images.toJSON()}
            ));
        }
    }
});