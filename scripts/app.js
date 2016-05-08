require('../css/reset.scss');
require('../css/admin/base.scss');//
require('../css/admin/style.scss');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.min.css');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css');

var $ = require('jquery');
var ArtistsCollection = require('./collections/artists.js');
var ArtistsView = require('./views/artists.js');
var AudioUploadModel = require('./models/audioUpload.js');
var AudioUploadView = require('./views/audioUpload.js');
var Backbone = require('backbone');
var NavView = require('./views/nav.js');
var PlayerModel = require('./models/player.js');
var PlayerView = require('./views/player.js');
var PlaylistModel = require('./models/playlist.js');
var PlaylistsCollection = require('./collections/playlists.js');
var PlaylistsView = require('./views/playlists.js');
var QueueCollection = require('./collections/queue.js');
var QueueHistoryCollection = require('./collections/queueHistory.js');
var QueueView = require('./views/queue.js');
var RecordingsCollection = require('./collections/recordings.js');
var RecordingsView = require('./views/recordings.js');
var Router = require('./router.js');


// Global App Object
global.X7 = {
    models: {},
    collections: {},
    views: {},
    routers: {}
};

// Create model instances
X7.collections.artists = new ArtistsCollection();
X7.collections.playlists = new PlaylistsCollection();
X7.collections.queue = new QueueCollection();
X7.collections.queueHistory = new QueueHistoryCollection();
X7.collections.recordings = new RecordingsCollection();
X7.models.audioUpload = new AudioUploadModel();
X7.models.newPlaylist = new PlaylistModel();

$(function(){

    X7.views.artists = new ArtistsView({collection: X7.collections.artists});
    X7.views.audioUpload = new AudioUploadView({model: X7.models.audioUpload});
    X7.views.nav = new NavView();
    X7.views.playlists = new PlaylistsView({collection: X7.collections.playlists});
    X7.views.queue = new QueueView({collection: X7.collections.queue});
    X7.views.recordings = new RecordingsView({collection: X7.collections.recordings});

    // Bootstrap the application after syncing models with server
    $( document ).ajaxStop(function() {
        $(this).unbind("ajaxStop");
        $("#loading").remove();

        // player
        X7.models.player = new PlayerModel(X7.collections.queue);
        X7.views.player = new PlayerView({model: X7.models.player});

        X7.views.nav.render();
        X7.views.player.render();
        X7.router = new Router();
        Backbone.history.start();

        // close any context menus if a click event bubbles up
        $("body").click(function(){
            $(".contextMenu").empty();
        })
    });

});
