var $ = require('jquery');
var Backbone = require('backbone');
var qs = require('query-string');
var config = require('./config');
var token = require('./core/token');

var RecordingDetailsView = require('./views/recording');
var RecordingEditPanelView = require('./views/recordingEdit');

var PlaylistFormView = require('./views/playlistForm');

var ArtistFormView = require('./views/artistForm');

var ArtistModel = require('./models/artist');
var ArtistView = require('./views/artist');
var ArtistsView = require('./views/artists');
var RecordingsView = require('./views/recordings');
var RecordingsCollection = require('./collections/recordings');
var PlaylistModel = require('./models/playlist');
var PlaylistView = require('./views/playlist');
var OverlayModel = require('./models/overlay');
var OverlayView  = require('./views/overlay');


module.exports = Backbone.Router.extend({

    routes: {

        ''                                  : 'home',
        'home'                              : 'home',

        'login'                             : 'login',
        'logout'                            : 'logout',

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
        'artist/:id(?*qs)'                  : 'artist',

        'playlists'                         : 'playlists',
        'playlists/highlight/:id'           : 'playlistHighlight',
        'playlist/edit/:id'                 : 'playlistEdit',
        'playlist/add'                      : 'playlistAdd',
        'playlist/:id'                      : 'playlist',

        'search'                            : 'search',

        'tags'                              : 'tags'
    },

    /**
     * ROUTES
     */

    login: function() {

        function onTokenVerified() {
            this._showInMainContent(X7.views.login);
        }
        token.verify(onTokenVerified.bind(this));
    },

    logout: function() {
        window.localStorage.removeItem(config.LS_ACCESS_TOKEN);
        X7.adminUser = false;
        Backbone.history.history.back();
        X7.views.nav.render();
    },

    home: function(){
        this._showInMainContent(X7.views.home);
        this._selectItemById("navHome");
    },

    recordings: function() {
        var recordingsCollection = new RecordingsCollection();
        var recordingsView = new RecordingsView({collection:recordingsCollection});
        this._showInMainContent(recordingsView);
        this._selectItemById("navRecordings");
    },

    recordingHighlight: function(id){
        var recordingsCollection = new RecordingsCollection();
        var recordingsView = new RecordingsView({
            collection:recordingsCollection,
            highlightId:id
        });
        this._showInMainContent(recordingsView);
        this._selectItemById("navRecordings");
    },

    recordingDetails: function(id){
        this._showInMainContent(new RecordingDetailsView({model:X7.collections.recordings.get(id)}));
    },

    recordingEdit: function(id){
        this._showInMainContent(new RecordingEditPanelView({model:X7.collections.recordings.get(id)}));
        this._selectItemById("navRecordings");
    },

    recordingAdd: function(step, queryString) {
        var that = this;
        this._pausePlayback();

        X7.models.audioUpload.setStep(step ? parseInt(step) : 1);
        var actIdFromQs = qs.parse(queryString).actId;
        if (actIdFromQs){
            X7.models.audioUpload.set("actID", actIdFromQs);
        }

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

    artists: function(e) {
        this._showInMainContent(new ArtistsView({collection:X7.collections.artists}));
        this._selectItemById("navArtists");
    },

    artist: function(id, tab) {
        this._showInMainContent(new ArtistView({id:id,tab:tab}));
        this._selectItemById("navArtists");
    },

    artistHighlight: function(id) {
        this._showInMainContent(new ArtistsView({
            collection:X7.collections.artists,
            highlightId:id
        }));
        this._selectItemById("navArtists");
    },

    artistEdit: function(id) {
        this._showInMainContent(new ArtistFormView({
            model: new ArtistModel({id:id}),
            newArtist: false
        }));
        this._selectItemById("navArtists");
    },

    artistAdd: function(e) {
        this._hideOverlay();
        this._showInMainContent(new ArtistFormView({
            model: new ArtistModel(),
            returnUrl: this._getReturnUrlFromQs(e),
            newArtist: true
        }));
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
        this._selectItemById("navPlaylists");
    },

    playlistEdit: function(id){
        this._showInMainContent(new PlaylistFormView({
            model: new PlaylistModel({id:id}),
            newAPlaylist: false
        }));
        this._selectItemById("navPlaylists");
    },

    playlistAdd: function(e){
        this._showInMainContent(new PlaylistFormView({
            model: new PlaylistModel(),
            returnUrl: this._getReturnUrlFromQs(e),
            newPlaylist: true
        }));
        this._selectItemById("navPlaylists");
    },

    search: function(e) {
        this._showInMainContent(X7.views.search);
        this._selectItemById("navSearch");
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

    _hideOverlay: function(){
        $("#overlayContainer").hide();
    },

    _selectItemById: function(id){//
        X7.views.nav.selectItemById(id);
    },

    _pausePlayback: function(){
        X7.models.player.pause();
    }

});
