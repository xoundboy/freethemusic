var ImageModel = require("../models/image.js");
var _ = require('underscore');

module.exports = Backbone.Collection.extend({

    model: ImageModel,

    url: function(){
        return "api/gallery/" + this.galleryID;
    },

    initialize: function(options){
        _.extend(this, _.pick(options, "galleryID"));
    }
});