var PlaylistsCollection = require('../collections/playlists');
var PlaylistsView = require('../views/playlists');

module.exports = {

    create: function (viewName, options){

        options = options || {};
        var highlightId = options.highlightId || null;

        switch (viewName){

            case "playlists" :
                return new PlaylistsView({
                    collection: new PlaylistsCollection(),
                    highlightId:highlightId
                });

            default:
                console.log(viewName + ": unknown view, cannot be instantiated.");
                return;
        }
    }
};