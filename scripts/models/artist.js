var ImagesCollection = require("../collections/images.js");

module.exports = Backbone.Model.extend({

    urlRoot: "api/artist",

    defaults: {
        imgFile: "no_image.jpg"
    },

    parse: function(response){
        var parsedImages = JSON.parse(response.images);
        var imagesCollection = new ImagesCollection(parsedImages);
        response.images = imagesCollection;
        return response;
    }


});