var ArtistModel = require('../models/artist.js');

module.exports = Backbone.Collection.extend({
    model: ArtistModel,
    url: "api/artists",
    parse: function(response){
        return response[0];
    }
});