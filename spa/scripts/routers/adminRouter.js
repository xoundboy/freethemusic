var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'recordingsTab',
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
        adminApp.models.dashboard.set("currentTab", "recordings");
    },

    uploadsTab: function() {
        adminApp.models.dashboard.set("currentTab", "audioUpload");
    },

    recordingsTab: function() {
        adminApp.models.dashboard.set("currentTab", "recordings");
    },

    artistsTab: function() {
        adminApp.models.dashboard.set("currentTab", "artists");
    },

    playlistsTab: function() {
        adminApp.models.dashboard.set("currentTab", "playlists");
    }

});
