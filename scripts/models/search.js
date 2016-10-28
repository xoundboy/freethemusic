module.exports = Backbone.Model.extend({
    defaults: {
        q: "",
        resultsCount: true
    },
    setResultsCount: function(){
        var r = this.get("results");
        this.set("resultsCount", r.artists.length  + r.playlists.length + r.recordings.length);
    }
});
