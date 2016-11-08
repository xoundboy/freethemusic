var PlaylistModel = require('../models/playlist.js');
var util = require('../helpers/commonUtils');

module.exports = Backbone.Collection.extend({

    model: PlaylistModel,
    url: "api/playlist/all",
    sort_key: "name",

    initialize: function() {
        this.bind("remove", function (model) {
            model.destroy({wait: true});
        });
    },

    resetModels: function(models){
        this.reset(null);
        if (util.isArray(models)){
            for (var index in models){
                var model = new PlaylistModel(models[index]);
                this.add(model);
            }
        }
    },

    comparator: function(item) {
        return item.get(this.sort_key);
    },

    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    },

    getFilteredCollection: function(modelToRemove){
        if (!modelToRemove)
            return this;
        var filteredPlaylists = this.filter(function(playlist) {
            return playlist.id !== modelToRemove.id;
        });
        return new Backbone.Collection(filteredPlaylists);
    }
});