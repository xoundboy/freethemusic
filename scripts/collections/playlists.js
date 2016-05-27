var PlaylistModel = require('../models/playlist.js');

module.exports = Backbone.Collection.extend({

    model: PlaylistModel,
    url: "api/playlists",
    sort_key: "name",

    initialize: function() {
        this.bind("remove", function (model) {
            model.destroy({wait: true});
        });
    },

    comparator: function(item) {
        return item.get(this.sort_key);
    },

    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    }
});