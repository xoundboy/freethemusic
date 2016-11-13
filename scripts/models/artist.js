var RecordingsCollection = require('../collections/recordings');
var PlaylistsCollection = require('../collections/playlists');
var _ = require('underscore');

module.exports = Backbone.Model.extend({

    urlRoot: "api/artist",

    parse: function(response) {

        var recordingModels = _.clone(response.recordings);
        var playlistModels = _.clone(response.playlists);

        response.recordings = new RecordingsCollection();
        response.playlists = new PlaylistsCollection();

        if (recordingModels)
            response.recordings.resetModels(recordingModels);
        if (playlistModels)
            response.playlists.resetModels(playlistModels);

        return response;
    },

    selectTab: function (tab){
        this.set(tab + "Selected", true);
    }
});