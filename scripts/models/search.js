module.exports = Backbone.Model.extend({
    url: "api/search",
    defaults: {
        q: ""
    },
    setResultsCount: function(){
        var r = this.get("results");
        this.set("resultsCount", r.artists.length
            + r.playlists.length + r.recordings.length);
    }
});
