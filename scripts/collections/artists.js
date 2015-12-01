var utils = require('../utils.js');
var ArtistModel = require('../models/artist.js');

module.exports = Backbone.Collection.extend({

    model: ArtistModel,
    url: "api/artists",
    sort_key: "actName",

    initialize: function() {
        this.bind("remove", function (model) {
            model.destroy({wait: true});
            utils.createNotification({
                message: "ARTIST DELETED<br />" + model.get("actName"),
                autohide: true
            });
        });
    },

    parse: function(response){
        return response[0];
    }
});