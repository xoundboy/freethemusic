/**
 * Created by xoundboy on 16/02/16.
 */
var config = require('../config.js');

module.exports = Backbone.Model.extend({

    defaults: {
        isPlaying: false,
        playlist: null,
        loadedModel: null
    },

    initialize: function(playlist) {

        if (playlist){
            this.connectToPlaylist(playlist);
        } else {
            throw "Missing playlist collection when initializing player";
        }

        if (playlist.length) {
            this.loadNext();
        } else {
            this.waitForTrackToBeAdded();
        }
    },

    connectToPlaylist: function(playlist){
        this.set("playlist", playlist);
    },

    waitForTrackToBeAdded: function(){

        var that = this;
        var playlist = this.get("playlist");

        this.listenTo(playlist, 'add', function () {
            that.loadNext();
            that.stopListening(playlist, 'add');
            that.play();
        });
    },

    setLoadedModelId: function(id){
        if (id){
            window.localStorage.setItem(config.LS_PLAYER_LOADED_ID, id);
        } else {
            window.localStorage.removeItem(config.LS_PLAYER_LOADED_ID);
        }
    },

    getLoadedModelId: function(){
        return window.localStorage.getItem(config.LS_PLAYER_LOADED_ID);
    },

    load: function(model){
        this.set("loadedModel", model);
        this.setLoadedModelId(model.id);
        this.trigger("loaded");
    },

    unLoad: function(){
        this.unset("loadedModel");
        this.setLoadedModelId(null);
    },

    loadNext: function(){
        var nextModel = this.get("playlist").nextModel(this.get("loadedModel"));
        if (nextModel){
            this.load(nextModel);
        }
    },

    loadPrevious: function(){
        var currentModel = this.get("loadedModel");
        var previousModel = this.get("playlist").previousModel(currentModel);
        if (previousModel) {
            this.load(previousModel);
        }
    },

    play: function(){
        this.set("isPlaying", true);
    },

    pause: function() {
        this.set("isPlaying", false);
    },

    playPause: function(){
        this.set("isPlaying", !this.get("isPlaying"));
    }
});