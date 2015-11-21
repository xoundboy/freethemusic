var ArtistModel = require('../models/artist.js');

module.exports = Backbone.Collection.extend({

    model: ArtistModel,
    url: "api/artists",
    sort_key: "actName",

    initialize: function() {
        this.bind("remove", function (model) {
            model.destroy({wait: true});
        });
    },

    parse: function(response){
        return response[0];
    }
});