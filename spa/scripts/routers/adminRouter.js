var $ = require('jquery');
var Backbone = require('backbone');

var RecordingEditPanelView = require('../views/admin/recordingEditPanel.js');
var ArtistAddOrEditPanelView = require('../views/admin/artistAddOrEditPanel.js');
var ArtistModel = require('../models/artist.js');

module.exports = Backbone.Router.extend({

    routes: {

        ''                          : 'recordings',
        'recordings'                : 'recordings',
        'recordings/highlight/:id'  : 'recordingHighlight',
        'recording/edit/:id'        : "recordingEdit",
        'recording/add'             : 'recordingAdd',

        'artists'                   : 'artists',
        'artists/highlight/:id'     : 'artistHighlight',
        'artist/edit/:id'           : "artistEdit",
        'artist/add'               : 'artistAdd',

        'playlists'                 : 'playlists',

        'tags'                      : 'tags'
    },


    recordings: function() {
        adminApp.views.recordings.setSelectedId(null);
        adminApp.views.dashboard.loadTabHtml(adminApp.views.recordings.render().el);
    },

    recordingHighlight: function(id){
        adminApp.views.recordings.setSelectedId(id);
        adminApp.views.dashboard.loadTabHtml(adminApp.views.recordings.render().el);
        adminApp.views.dashboard.scrollToElement($("#recordingId-" + id));
    },

    recordingEdit: function(id){
        var recordingEditPanel = new RecordingEditPanelView({
            model: adminApp.collections.recordings.get(id),
            template: $('#template_recordingEditPanel').html()
        });
        adminApp.views.dashboard.loadTabHtml(recordingEditPanel.render().el);
    },

    recordingAdd: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.audioUpload.render().el);
    },


    artists: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.artists.render().el);
    },

    artistHighlight: function(id){
        adminApp.views.artists.setSelectedId(id);
        adminApp.views.dashboard.loadTabHtml(adminApp.views.artists.render().el);
        adminApp.views.dashboard.scrollToElement($("#actID-" + id));
    },

    artistEdit: function(id){
        var artistEditPanel = new ArtistAddOrEditPanelView({
            model: adminApp.collections.artists.get(id),
            template: $('#template_artistAddOrEditPanel').html()
        });
        adminApp.views.dashboard.loadTabHtml(artistEditPanel.render().el);
    },

    artistAdd: function() {
        var artistAddPanel = new ArtistAddOrEditPanelView({
            model: new ArtistModel(),
            template: $('#template_artistAddOrEditPanel').html()
        });
        adminApp.views.dashboard.loadTabHtml(artistAddPanel.render().el);
    },

    playlists: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.playlists.render().el);
    },

    tags: function() {
        adminApp.views.dashboard.loadTabHtml(adminApp.views.tags.render().el);
    }

});
