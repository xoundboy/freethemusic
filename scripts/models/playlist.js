var _ = require('underscore');

module.exports = Backbone.Model.extend({

    urlRoot: "api/playlist",

    initialize: function(){
        this.set("trackList", []);
    },

    parse: function(response){
        response.isAlbum = response.isAlbum !== "false";
        return response;
    },

    addTrack: function(recordingId, callback) {
        var trackList = this.get("trackList");
        trackList.push(parseInt(recordingId));
        this.set({trackList:trackList},{silent:true});
        this.save({success:callback()},{silent:true});
    },

    whiteList: ['id','name','actID','yearPublished','label','isAlbum','notes','trackList'],

    toJSON: function(){
        return _.pick(this.attributes, this.whiteList);
    }}
);