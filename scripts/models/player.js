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
            var model = X7.collections.queue.get(modelId);
            if (model) this.load(model);
        } else {
            this.waitForTrackToBeAdded();
        }

        if (!this.getPlaybackPosition()) this.setPlaybackPosition(0);
    },

    connectToTracklist: function(trackList, playFromTop){
        this.set("trackList", trackList);
        if (playFromTop) {
            this.load(trackList.at(0), true);
        }
    },

    waitForTrackToBeAdded: function(){

        var that = this;
        var trackList = this.get("trackList");

        this.listenTo(trackList, 'add', function (e) {
            that.loadNext();
            that.stopListening(trackList, 'add');
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

    playPlaylistTrack: function(track, tracklist){
        if (this.get("trackList") != tracklist){
            this.connectToTracklist(tracklist, false);
        }
        if (this.get("loadedModel") != track){
            this.setPlaybackPosition(0);
            this.load(track, true);
        } else if (!this.get("isPlaying")){
            this.load(track, true);
        }
    },

    unLoad: function(){
        this.unset("loadedModel");
        this.setLoadedModelId(null);
    },

    loadNext: function(){
        var nextModel = this.get("trackList").nextModel(this.get("loadedModel"));
        if (nextModel){
            this.setPlaybackPosition(0);
            this.load(nextModel);
            if (this.isPlaying()){
                this.play();
            }
        }
    },

    loadPrevious: function(){
        var previousModel = this.get("trackList").previousModel(this.get("loadedModel"));
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
        this.trigger("playing", this.get("loadedModel").id);
        this.updateCurrentTimeInterval = setInterval($.proxy(this.updatePlaybackPosition, this), 50);
    },

    pause: function() {
        this.setPlaybackPosition(this.audioElement.elem.currentTime);
        this.set("isPlaying", false);
        this.audioElement.pause();
        this.trigger("stop");
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