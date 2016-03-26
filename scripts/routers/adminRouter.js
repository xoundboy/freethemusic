var $ = require('jquery');
var Backbone = require('backbone');
var qs = require('query-string');

var RecordingDetailsView        = require('../views/admin/recording.js');
var RecordingEditPanelView      = require('../views/admin/recordingEditPanel.js');
var ArtistAddOrEditPanelView    = require('../views/admin/artistAddOrEditPanel.js');
var ArtistModel                 = require('../models/artist.js');

var OverlayModel                = require('../models/overlay.js');
var OverlayView                 = require('../views/admin/overlay.js');
var ArtistView                  = require('../views/admin/artist.js');

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

        'tags'                              : 'tags'
    },

    /**
     * ROUTES
     */

    recordings: function() {
        this._showInMainContent(adminApp.views.recordings);
        this._selectItemById("navRecordings");
    },

    recordingHighlight: function(id){
        this._showInMainContent(adminApp.views.recordings);
        this._highlightElement($("#recordingId-" + id));
        this._selectItemById("navRecordings");
    },

    recordingDetails: function(id){
        var recordingDetailsView = new RecordingDetailsView({
            model: adminApp.collections.recordings.get(id),
            template: $('#template_recordingDetails').html()
        });
        this._showInMainContent(recordingDetailsView);
    },

    recordingEdit: function(id){
        var recordingEditPanel = new RecordingEditPanelView({
            model: adminApp.collections.recordings.get(id),
            template: $('#template_recordingEditPanel').html()
        });
        this._showInMainContent(recordingEditPanel);
        this._selectItemById("navRecordings");
    },

    recordingAdd: function(step) {
        var that = this;
        this._pausePlayback();

        adminApp.models.audioUpload.setStep(step ? parseInt(step) : 1);

        this._showInOverlay({
            contentView: adminApp.views.audioUpload,
            onClose: function(){
                that.navigate('recordings', {trigger: true});
            }
        });
        this._selectItemById("navRecordings");
    },

    queue: function() {
        this._showInMainContent(adminApp.views.queue);
        this._selectItemById("navQueue");
    },

    artists: function() {
        this._showInMainContent(adminApp.views.artists);
        this._selectItemById("navArtists");
    },

    artist: function(id) {
        var artistView = new ArtistView({
            model: adminApp.collections.artists.get(id),
            template: $("#template_artist").html()
        });
        this._showInMainContent(artistView);
        this._selectItemById("navArtists");
    },

    artistHighlight: function(id) {
        this._showInMainContent(adminApp.views.artists);
        this._highlightElement($("#actID-" + id));
        this._selectItemById("navArtists");
    },

    artistEdit: function(id) {
        new ArtistAddOrEditPanelView({
            id:id,
            containerElSelector: "#mainContent"
        }).render();
        this._selectItemById("navArtists");
    },

    artistAdd: function(e) {
        new ArtistAddOrEditPanelView({returnUrl: this._getReturnUrlFromQs(e),

        }).render();
        this._selectItemById("navArtists");
    },

    playlists: function() {
        this._showInMainContent(adminApp.views.playlists);
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
            template: $("#template_overlay").html(),
            contentView: options.contentView,
            onClose: options.onClose
        });

        $("#overlayContainer").show();
    },

    _selectItemById: function(id){
        adminApp.views.nav.selectItemById(id);
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
        adminApp.models.player.pause();
    }

});
