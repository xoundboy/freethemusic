var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'recordingsTab',
        'recordings': 'recordingsTab',
        'recordings/highlight/:id': 'highlightRecording',
        'audioUpload': 'uploadsTab',
        'artists': 'artistsTab',
        'playlists': 'playlistsTab',
        'tags': 'tagsTab'
    },

    showDashboard: function () {
        adminApp.views.dashboard.render();
    },

    highlightRecording: function(id){
        adminApp.views.recordings.setSelectedId(id);
        adminApp.views.dashboard.switchMainContent("recordings");
        adminApp.views.dashboard.scrollToElement($("#recordingId-" + id));
    },

    uploadsTab: function() {
        adminApp.views.dashboard.switchMainContent("audioUpload");
    },

    recordingsTab: function() {
        adminApp.views.recordings.setSelectedId(null);
        adminApp.views.dashboard.switchMainContent("recordings");
    },

    artistsTab: function() {
        adminApp.views.dashboard.switchMainContent("artists");
    },

    playlistsTab: function() {
        adminApp.views.dashboard.switchMainContent("playlists");
    },

    tagsTab: function() {
        adminApp.views.dashboard.switchMainContent("tags");
    },

});
