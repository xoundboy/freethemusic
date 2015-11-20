
require('../css/reset.scss');
require('../css/admin/base.scss');//
require('../css/admin/style.scss');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.min.css');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css');
require('../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css');

var $ = require('jquery');
var Backbone = require('backbone');
var AdminRouter = require('./routers/adminRouter.js');
var DashboardModel = require('./models/dashboard.js');
var DashboardView = require('./views/admin/dashboard.js');
var RecordingsCollection = require('./collections/recordings.js');
var RecordingsView = require('./views/admin/recordings.js');
var AudioUploadModel = require('./models/audioUpload.js');
var AudioUploadView = require('./views/admin/audioUpload.js');
var ArtistsCollection = require('./collections/artists.js');
var ArtistsView = require('./views/admin/artists.js');
var PlaylistsCollection = require('./collections/playlists.js');
var PlaylistsView = require('./views/admin/playlists.js');
var TagsCollection = require('./collections/tags.js');
var TagsView = require('./views/admin/tags.js');


// Global App Object
global.adminApp = {
    models: {},
    collections: {},
    views: {},
    routers: {}
};


$(function(){

    // artists tab
    adminApp.collections.artists = new ArtistsCollection();
    adminApp.views.artists = new ArtistsView({
        collection: adminApp.collections.artists,
        template: $("#template_artists").html()
    });

    // Dashboard
    adminApp.models.dashboard = new DashboardModel();
    adminApp.views.dashboard = new DashboardView({
        model: adminApp.models.dashboard,
        template: $("#template_dashboard").html()
    });

    // recordings tab
    adminApp.collections.recordings = new RecordingsCollection();
    adminApp.views.recordings = new RecordingsView({
        collection: adminApp.collections.recordings,
        template: $("#template_recordings").html()
    });

    // uploads tab
    adminApp.models.audioUpload = new AudioUploadModel();
    adminApp.views.audioUpload = new AudioUploadView({
        model: adminApp.models.audioUpload,
        template: $("#template_audioUpload").html()
    });

    // playlists tab
    adminApp.collections.playlists = new PlaylistsCollection();
    adminApp.views.playlists = new PlaylistsView({
        collection: adminApp.collections.playlists,
        template: $("#template_playlists").html()
    });

    // tags tab
    adminApp.collections.tags = new TagsCollection();
    adminApp.views.tags = new TagsView({
        collection: adminApp.collections.tags,
        template: $("#template_tags").html()
    });

    // Bootstrap the application
    $( document ).ajaxStop(function() {
        $(this).unbind("ajaxStop");
        $("#loading").remove();
        adminApp.views.dashboard.render();
        adminApp.models.dashboard.set("currentTab", "recordings");
        adminApp.routers.main = new AdminRouter();
        Backbone.history.start();
    });

});
