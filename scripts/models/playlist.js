var _ = require('underscore');
var utils = require('../helpers/commonUtils');

module.exports = Backbone.Model.extend({

    urlRoot: "api/playlist",

    defaults: {
        trackList: []
    },

    parse: function(response){
        response.isAlbum = response.isAlbum !== "false";
        response.images = response.images === undefined || response.images === "" ? null
            : JSON.parse(response.images);
        response.trackList = utils.parseJSON(response.trackList);
        response.listLength = response.trackList ? response.trackList.length : 0;
        return response;
    },

    addTrack: function(recordingId, callback) {
        trackList = this.getTrackList();
        var id = parseInt(recordingId);
        if (trackList.indexOf(id) == -1) trackList.push(id);
        this.set({trackList:JSON.stringify(trackList)},{silent:true});
        this.save({success:callback()},{silent:true});
    },

    getTrackList: function (){
        var trackList = utils.parseJSON(this.get("trackList"));
        return trackList ? trackList : [];
    },

    setTrackList: function (trackList){
        this.set("trackList", JSON.stringify(trackList));
        this.save();
    },

    removeTrack: function(id){
        X7.collections.tracklist.delete(id);
        var trackList = this.getTrackList();
        var modifiedTrackList = _.filter(trackList, function(el){return el !== parseInt(id);});
        this.setTrackList(modifiedTrackList);
    },

    whiteList: ['id','name','actID', 'actName', 'yearPublished','label','isAlbum','notes','trackList','listLength'],

    toJSON: function(){
        return _.pick(this.attributes, this.whiteList);
    }}
);