var PlaylistsCollection = require('../collections/playlists');
var RecordingsCollection = require('../collections/recordings');
var ArtistsCollection = require('../collections/artists');

module.exports = Backbone.Model.extend({

    defaults: {
        q: "",
        playlLists: null,
        resultsCount: true
    },

    initialize: function(){
        this.set("playLists", new PlaylistsCollection());
        this.set("recordings", new RecordingsCollection());
        this.set("artists", new ArtistsCollection());
    },

    setResultsCount: function(){
        var r = this.get("results");
        this.set("resultsCount", r.artists.length  + r.playlists.length + r.recordings.length);
    },

    processResultsData: function(data){
        this.set("results", data);
        this.setResultsCount();
        this.get("playLists").resetModels(data.playlists);
        this.get("recordings").resetModels(data.recordings);
        this.get("artists").resetModels(data.artists);
        this.trigger("change");
    }
});
