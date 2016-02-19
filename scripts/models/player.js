/**
 * Created by xoundboy on 16/02/16.
 */
var config = require('../config.js');

module.exports = Backbone.Model.extend({

    defaults: {
      isPlaying: false
    },

    setLoadedModel: function(index, id){
        window.localStorage.setItem(config.LS_CURRENTLY_PLAYING_INDEX, index);
        window.localStorage.setItem(config.LS_PLAYER_LOADED_ID, id);
    },

    loadQueueIndex: function(index){
        this.setLoadedModel(index);
        var model = adminApp.collections.queue.at(index);
        this.loadRecordingModel(model);
    },

    loadRecordingModel: function(model){
        this.set(model);
    },

    play: function(){
        this.set("isPlaying", true);
    },

    playPause: function(){
        console.log("player model 'playPause'");
        this.set("isPlaying", !this.get("isPlaying"));
    }
});