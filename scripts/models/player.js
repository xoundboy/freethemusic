/**
 * Created by xoundboy on 16/02/16.
 */
module.exports = Backbone.Model.extend({

    defaults: {
      isPlaying: false
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