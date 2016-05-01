
var TrackListCollection = require("../collections/trackList.js");

module.exports = Backbone.Model.extend({

    urlRoot: "api/playlist",

    initialize: function(){
        this.set("trackList", new TrackListCollection());
    },

    parse: function(response){
        response.isAlbum = response.isAlbum !== "false";
        return response;
    },

    addTrack: function(recordingModel) {
        var trackList = this.get("trackList");
        trackList.add(recordingModel);
    }
});