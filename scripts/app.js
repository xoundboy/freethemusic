require('../css/reset.scss');
require('../css/admin/base.scss');//
require('../css/admin/style.scss');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.min.css');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css');
require('./core/sync');

var $ = require('jquery');
window.jQuery = $;

var AudioUploadModel = require('./models/audioUpload');
var AudioUploadView = require('./views/audioUpload');
var ArtistsCollection = require('./collections/artists');
var ArtistsView = require('./views/artists');
var Backbone = require('backbone');
var HomeView = require('./views/home');
var HomeModel = require('./models/home');
var LoginView = require('./views/login');
var NavView = require('./views/nav');
var PlayerModel = require('./models/player');
var PlayerView = require('./views/player');
var PlaylistsCollection = require('./collections/playlists');
var PlaylistsView = require('./views/playlists');
var QueueCollection = require('./collections/queue');
var QueueHistoryCollection = require('./collections/queueHistory');
var QueueView = require('./views/queue');
var Router = require('./router');
var SearchView = require('./views/search');
var SearchModel = require('./models/search');

var config = require('./config');
var token = require('./core/token');

// Global App Object
global.X7 = {
    models: {},
    collections: {
        artists: null
    },
    views: {},
    routers: {},
    adminUser: false
};

X7.collections.playlists = new PlaylistsCollection();
X7.collections.playlists.fetch();

X7.collections.artists = new ArtistsCollection();
X7.collections.artists.fetch();

X7.collections.queue = new QueueCollection();
X7.collections.queueHistory = new QueueHistoryCollection();

X7.models.audioUpload = new AudioUploadModel();
X7.models.home = new HomeModel();
X7.models.search = new SearchModel();
X7.views.login = new LoginView();
X7.views.search = new SearchView({model: X7.models.search});

var bootStrap = function(){
    X7.views.audioUpload = new AudioUploadView({model: X7.models.audioUpload});
    X7.views.home = new HomeView({model:X7.models.home});
    X7.views.nav = new NavView();
    X7.views.playlists = new PlaylistsView({collection: X7.collections.playlists});
    X7.views.artists = new ArtistsView({collection: X7.collections.artists});
    X7.views.queue = new QueueView({collection: X7.collections.queue});

    // Bootstrap the application after syncing models with server
    $( document ).ajaxStop(function() {
        $(this).unbind("ajaxStop");
        $("#loading").remove();

        X7.models.player = new PlayerModel(X7.collections.queue);
        X7.views.player = new PlayerView({model: X7.models.player});

        X7.views.nav.render();
        X7.views.player.render();
        X7.router = new Router();
        Backbone.history.start();

        // close any context menus if a click event bubbles up
        $("body").click(function(){
            $(".contextMenu").empty();
        });
    });
};

$(function(){
    token.verify(bootStrap);
});
