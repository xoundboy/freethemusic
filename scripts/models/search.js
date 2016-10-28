var PlaylistsCollection = require('../collections/playlists');

module.exports = Backbone.Model.extend({

    defaults: {
        q: "",
        playLists: null,
        resultsCount: true
    },

    initialize: function(){
        this.set("playLists", new PlaylistsCollection());
    },

    setResultsCount: function(){
        var r = this.get("results");
        this.set("resultsCount", r.artists.length  + r.playlists.length + r.recordings.length);
    },

    processResultsData: function(data){
        this.set("results", data);
        this.setResultsCount();
        this.get("playLists").resetModels(data.playlists);
        this.trigger("change");
    }
});
