/**
 * Created by xoundboy on 16/02/16.
 */
var config = require('../config.js');
var AudioElement = require('../helpers/AudioElement.js');
var $ = require('jquery');

module.exports = Backbone.Model.extend({

    updateCurrentTimeInterval: null,

    defaults: {
        isPlaying: false,
        playlist: null,
        loadedModel: null,
        duration: 0
    },

    audioElement: null,

    initialize: function(tracklist) {

        this.audioElement = new AudioElement();
        this.audioElement.init();

        if (tracklist){
            this.connectToTracklist(tracklist);
        } else {
            throw "Missing tracklist collection when initializing player";
        }

        if (tracklist.length) {
            var modelId = window.localStorage.getItem(config.LS_PLAYER_LOADED_ID);
            this.load(X7.collections.queue.get(modelId));
        } else {
            this.waitForTrackToBeAdded();
        }

        if(!this.getPlaybackPosition()){
            this.setPlaybackPosition(0);
        }
    },

    connectToTracklist: function(trackList, playFromTop){
        this.set("playlist", trackList);
        if (playFromTop) {
            this.load(trackList.at(0), true);
        }
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

    updatePlaybackPosition: function(){
        this.setPlaybackPosition(this.audioElement.elem.currentTime);
    },

    load: function(model, playWhenLoaded){
        this.audioElement.load(model, this.getPlaybackPosition());
        this.set("loadedModel", model);
        this.setLoadedModelId(model.id);
        this.trigger("loaded");
        if (playWhenLoaded){
            this.play();
        }
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
        this.updateCurrentTimeInterval = setInterval($.proxy(this.updatePlaybackPosition, this), 50);
    },

    pause: function() {
        this.setPlaybackPosition(this.audioElement.elem.currentTime);
        this.set("isPlaying", false);
        this.audioElement.pause();
        clearInterval(this.updateCurrentTimeInterval);
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