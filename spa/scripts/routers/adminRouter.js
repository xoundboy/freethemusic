var $ = require('jquery');
var Backbone = require('backbone');

var RecordingEditPanelView = require('../views/admin/recordingEditPanel.js');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'recordingsTab',
        'recording/edit/:id': "editRecording",
        'recordings': 'recordingsTab',
        'recordings/highlight/:id': 'highlightRecording',
        'audioUpload': 'uploadsTab',
        'artists': 'artistsTab',
        'playlists': 'playlistsTab',
        'tags': 'tagsTab'
    },

    editRecording: function(id){
        var recordingModel = adminApp.collections.recordings.get(id);
        var recordingEditPanel = new RecordingEditPanelView({
            model: recordingModel,
            template: $('#template_recordingEditPanel').html()
        });
        var tabHtml = recordingEditPanel.render().el;
        adminApp.views.dashboard.loadTabHtml(tabHtml);
    },

    highlightRecording: function(id){
        adminApp.views.recordings.setSelectedId(id);
        adminApp.views.dashboard.loadTabHtml(adminApp.views.recordings.render().el);
        adminApp.views.dashboard.scrollToElement($("#recordingId-" + id));
    },

    uploadsTab: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.audioUpload.render().el);
    },

    recordingsTab: function() {
        adminApp.views.recordings.setSelectedId(null);
        adminApp.views.dashboard.loadTabHtml(adminApp.views.recordings.render().el);
    },

    artistsTab: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.artists.render().el);
    },

    playlistsTab: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.playlists.render().el);
    },

    tagsTab: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.tags.render().el);
    }

});
