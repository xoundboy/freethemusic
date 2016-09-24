﻿var $ = require('jquery');
var Backbone = require('backbone');
var qs = require('query-string');

var RecordingDetailsView        = require('./views/recording.js');
var RecordingEditPanelView      = require('./views/recordingEdit.js');

var PlaylistView                = require('./views/playlist.js');
var PlaylistAddOrEditPanelView  = require('./views/playlistForm.js');

var ArtistAddOrEditPanelView    = require('./views/artistForm.js');

var OverlayModel                = require('./models/overlay.js');
var OverlayView                 = require('./views/overlay.js');
var ArtistView                  = require('./views/artist.js');

module.exports = Backbone.Router.extend({

    routes: {
        ''                                  : 'recordings',
        'recordings'                        : 'recordings',
        'recordings/highlight/:id'          : 'recordingHighlight',
        'recording/:id'                     : 'recordingDetails',
        'recording/edit/:id'                : 'recordingEdit',
        'recording/add/:step(?*qs)'         : 'recordingAdd',

        'queue'                             : 'queue',

        'artists'                           : 'artists',
        'artists/highlight/:id'             : 'artistHighlight',
        'artist/edit/:id'                   : 'artistEdit',
        'artist/add'                        : 'artistAdd',
        'artist/:id'                        : 'artist',

        'playlists'                         : 'playlists',
        'playlists/highlight/:id'           : 'playlistHighlight',
        'playlist/edit/:id'                 : 'playlistEdit',
        'playlist/add'                      : 'playlistAdd',
        'playlist/:id'                      : 'playlist',

        'tags'                              : 'tags'
    },

    /**
     * ROUTES
     */

    recordings: function() {
        this._showInMainContent(X7.views.recordings);
        this._selectItemById("navRecordings");
    },

    recordingHighlight: function(id){
        this._showInMainContent(X7.views.recordings);
        this._highlightElement($("#recordingId-" + id));
        this._selectItemById("navRecordings");
    },

    recordingDetails: function(id){
        this._showInMainContent(new RecordingDetailsView({model:X7.collections.recordings.get(id)}));
    },

    recordingEdit: function(id){
        this._showInMainContent(new RecordingEditPanelView({model:X7.collections.recordings.get(id)}));
        this._selectItemById("navRecordings");
    },

    recordingAdd: function(step) {
        var that = this;
        this._pausePlayback();

        X7.models.audioUpload.setStep(step ? parseInt(step) : 1);

        this._showInOverlay({
            contentView: X7.views.audioUpload,
            onClose: function(){
                that.navigate('recordings', {trigger: true});
            }
        });
        this._selectItemById("navRecordings");
    },

    queue: function() {
        this._showInMainContent(X7.views.queue);
        this._selectItemById("navQueue");
    },

    artists: function() {
        this._showInMainContent(X7.views.artists);
        this._selectItemById("navArtists");
    },

    artist: function(id) {
        this._showInMainContent(new ArtistView({model:X7.collections.artists.get(id)}));
        this._selectItemById("navArtists");
    },

    artistHighlight: function(id) {
        this._showInMainContent(X7.views.artists);
        this._highlightElement($("#actID-" + id));
        this._selectItemById("navArtists");
    },

    artistEdit: function(id) {
        new ArtistAddOrEditPanelView({id:id,containerElSelector: "#mainContent"}).render();
        this._selectItemById("navArtists");
    },

    artistAdd: function(e) {
        new ArtistAddOrEditPanelView({returnUrl: this._getReturnUrlFromQs(e)}).render();
        this._selectItemById("navArtists");
    },

    playlists: function() {
        this._showInMainContent(X7.views.playlists);
        this._selectItemById("navPlaylists");
    },

    playlistHighlight: function(id) {
        this._showInMainContent(X7.views.playlists);
        this._highlightElement($("#playlistID-" + id));
        this._selectItemById("navPlaylists");
    },

    playlist: function(id){
        this._showInMainContent(new PlaylistView({id:id}));
    },

    playlistEdit: function(id){
        new PlaylistAddOrEditPanelView({id:id,containerElSelector: "#mainContent"}).render();
        this._selectItemById("navPlaylists");
    },

    playlistAdd: function(e){
        new PlaylistAddOrEditPanelView({returnUrl: this._getReturnUrlFromQs(e)}).render();
        this._selectItemById("navPlaylists");
    },


    /**
     * PRIVATE METHODS
     */

    _getReturnUrlFromQs: function(e){
        e = e || {};
        var options = qs.parse(e);
        return options.returnUrl ? options.returnUrl : null;
    },

    _showInMainContent: function(view){
        $("#mainContent").empty().html(view.render().el);
        $("#overlayContainer").hide();
    },

    _showInOverlay: function(options){

        new OverlayView({
            model: new OverlayModel(),
            contentView: options.contentView,
            onClose: options.onClose
        });

        $("#overlayContainer").show();
    },

    _selectItemById: function(id){
        X7.views.nav.selectItemById(id);
    },

    _highlightElement: function($element){

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
    },

    _pausePlayback: function(){
        X7.models.player.pause();
    }

});