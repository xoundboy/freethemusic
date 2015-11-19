var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'showDashboard',
        'recordings': 'recordingsTab',
        'recordings/highlight/:id': 'highlightRecording',
        'audioUpload': 'uploadsTab',
        'artists': 'artistsTab',
        'playlists': 'playlistsTab'
    },

    showDashboard: function () {
        adminApp.views.dashboard.render();
    },

    highlightRecording: function(id){
        adminApp.views.recordings.select(id);
        adminApp.models.dashboard.set("currentTabHref", "#recordings");
    },

    uploadsTab: function() {
        adminApp.models.dashboard.set("currentTabHref", "#audioUpload");
    },

    recordingsTab: function() {
        adminApp.models.dashboard.set("currentTabHref", "#recordings");
    },

    artistsTab: function() {
        adminApp.models.dashboard.set("currentTabHref", "#artists");
    },
    playlistsTab: function() {
        adminApp.models.dashboard.set("currentTabHref", "#playlists");
    }

});
