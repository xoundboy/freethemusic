﻿var $ = require('jquery');
var Backbone = require('backbone');

var RecordingEditPanelView = require('../views/admin/recordingEditPanel.js');
var ArtistAddOrEditPanelView = require('../views/admin/artistAddOrEditPanel.js');
var ArtistModel = require('../models/artist.js');

module.exports = Backbone.Router.extend({

    $main: $("#mainContent"),

    routes: {

        ''                          : 'recordings',
        'recordings'                : 'recordings',
        'recordings/highlight/:id'  : 'recordingHighlight',
        'recording/edit/:id'        : 'recordingEdit',
        'recording/add'             : 'recordingAdd',

        'queue'                     : 'queue',

        'artists'                   : 'artists',
        'artists/highlight/:id'     : 'artistHighlight',
        'artist/edit/:id'           : 'artistEdit',
        'artist/add'                : 'artistAdd',

        'playlists'                 : 'playlists',

        'tags'                      : 'tags'
    },


    recordings: function() {
        this.$main.html(adminApp.views.recordings.render().el);
        adminApp.views.nav.selectItemById("navRecordings");
    },

    recordingHighlight: function(id){
        this.$main.html(adminApp.views.recordings.render().el);
        this.highlightElement($("#recordingId-" + id));
        adminApp.views.nav.selectItemById("navRecordings");
    },

    recordingEdit: function(id){
        var recordingEditPanel = new RecordingEditPanelView({
            model: adminApp.collections.recordings.get(id),
            template: $('#template_recordingEditPanel').html()
        });
        this.$main.html(recordingEditPanel.render().el);
        adminApp.views.nav.selectItemById("navRecordings");
    },

    recordingAdd: function() {
        this.$main.html(adminApp.views.audioUpload.render().el);
        adminApp.views.nav.selectItemById("navRecordings");
    },


    queue: function() {
        var queueHtml = adminApp.views.queue.render().el;
        this.$main.html(queueHtml);
        adminApp.views.nav.selectItemById("navQueue");
    },


    artists: function() {
        this.$main.html(adminApp.views.artists.render().el);
        adminApp.views.nav.selectItemById("navArtists");
    },

    artistHighlight: function(id){
        this.$main.html(adminApp.views.artists.render().el);
        this.highlightElement($("#actID-" + id));
        adminApp.views.nav.selectItemById("navArtists");
    },

    artistEdit: function(id){
        var artistEditPanel = new ArtistAddOrEditPanelView({
            model: adminApp.collections.artists.get(id),
            template: $('#template_artistAddOrEditPanel').html()
        });
        this.$main.html(artistEditPanel.render().el);
        adminApp.views.nav.selectItemById("navArtists");
    },

    artistAdd: function() {
        var artistAddPanel = new ArtistAddOrEditPanelView({
            model: new ArtistModel(),
            template: $('#template_artistAddOrEditPanel').html()
        });
        this.$main.html(artistAddPanel.render().el);
        adminApp.views.nav.selectItemById("navArtists");
    },

    playlists: function() {
        this.$main.html(adminApp.views.playlists.render().el);
        adminApp.views.nav.selectItemById("navPlaylists");
    },

    highlightElement: function($element){

        if ($element.length){

            // highlight the colour
            $element.addClass("highlighted");

            // scroll into view
            var offset = $element.offset();
            if(offset){
                $('html, body').animate({
                    scrollTop: offset.top,
                    scrollLeft: offset.left
                }, "slow");

                setTimeout(function(){
                    // unhighlight after a couple of secs
                    $element.removeClass("highlighted");
                }, 2000);
            }
        }
    }

});
