/**
 * Created by xoundboy on 16/02/16.
 */
var config = require('../config.js');
var AudioElement = require('../helpers/AudioElement.js');

module.exports = Backbone.Model.extend({

    defaults: {
        isPlaying: false,
        playlist: null,
        loadedModel: null,
        duration: 0
    },

    audioElement: null,

    initialize: function(playlist) {

        this.audioElement = new AudioElement();
        this.audioElement.init();

        if (playlist){
            this.connectToPlaylist(playlist);
        } else {
            throw "Missing playlist collection when initializing player";
        }

        if (playlist.length) {
            var modelId = window.localStorage.getItem(config.LS_PLAYER_LOADED_ID)
            this.load(adminApp.collections.queue.get(modelId));
        } else {
            this.waitForTrackToBeAdded();
        }

        if(!this.getPlaybackPosition()){
            this.setPlaybackPosition(0);
        }
    },

    connectToPlaylist: function(playlist){
        this.set("playlist", playlist);
    },

    waitForTrackToBeAdded: function(){

        var that = this;
        var playlist = this.get("playlist");

        this.listenTo(playlist, 'add', function (e) {
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

    setPlaybackPosition: function(position){
        window.localStorage.setItem(config.LS_PLAYBACK_POSITION, position);
    },

    getPlaybackPosition: function(){
        return window.localStorage.getItem(config.LS_PLAYBACK_POSITION) || 0;
    },

    load: function(model){
        this.audioElement.load(model);
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
            this.setPlaybackPosition(0);
            this.load(nextModel);
            if (this.isPlaying()){
                this.play();
            }
        }
    },

    loadPrevious: function(){
        var previousModel = this.get("playlist").previousModel(this.get("loadedModel"));
        if (previousModel) {
            this.setPlaybackPosition(0);
            this.load(previousModel);
            if (this.isPlaying()){
                this.play();
            }
        }
    },

    play: function(){
        this.set("isPlaying", true);
        this.audioElement.play(this.getPlaybackPosition(), this.onTrackFinished);
    },

    pause: function() {
        this.setPlaybackPosition(this.audioElement.elem.currentTime);
        this.set("isPlaying", false);
        this.audioElement.pause();
    },

    playPause: function(){

        if (this.isPlaying()){
            this.pause();
        } else {
            this.play();
        }
    },

    isPlaying: function() {
        return this.get("isPlaying");
    },

    onTrackFinished: function(){
        console.log("track finished");
    }
});