var _ = require('underscore');

module.exports = Backbone.Model.extend({

    urlRoot: "api/playlist",

    defaults: {
        trackList: []
    },

    parse: function(response){
        response.isAlbum = response.isAlbum !== "false";
        response.images = response.images === undefined || response.images === "" ? null
            : JSON.parse(response.images);

        var trackList = response.trackList ? JSON.parse(response.trackList) : [];
        this.set("listLength", (trackList) ? trackList.length : 0);
        return response;
    },

    addTrack: function(recordingId, callback) {
        trackList = this.getTrackList();
        trackList.push(parseInt(recordingId));
        this.set({trackList:JSON.stringify(trackList)},{silent:true});
        this.save({success:callback()},{silent:true});
    },

    getTrackList: function (){
        var trackList = this.get("trackList");
        if (trackList === "null"){
            return [];
        } else {
            return JSON.parse(trackList);
        }
    },

    setTrackList: function (trackList){
        this.set("trackList", JSON.stringify(trackList));
        this.save();
    },

    removeTrackByIndex: function(index){
        var trackList = this.getTrackList();
        var modifiedTrackList = trackList.splice(index, 1);
        this.setTrackList(modifiedTrackList);
        this.save();
    },

    whiteList: ['id','name','actID', 'actName', 'yearPublished','label','isAlbum','notes','trackList','listLength'],

    toJSON: function(){
        return _.pick(this.attributes, this.whiteList);
    }}
);