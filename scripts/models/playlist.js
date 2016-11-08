var _ = require('underscore');
var utils = require('../helpers/commonUtils');
var TrackListCollection = require('../collections/trackList');

module.exports = Backbone.Model.extend({

    urlRoot: "api/playlist",

    parse: function(response){
        response.isAlbum = response.isAlbum !== "false";
        response.images = response.images === undefined || response.images === "" ? null
            : JSON.parse(response.images);
        response.trackListCollection = this.generateTrackListCollection(response.recordings);
        delete response.recordings;
        return response;
    },

    generateTrackListCollection: function(recordingsArray){
        var collection = new TrackListCollection();
        collection.populateByRecordingsArray(recordingsArray);
        return collection;
    },

    save: function(attrs, options) {
        var trackListCollection = this.get("trackListCollection");
        this.set("trackList", trackListCollection.exportIdList());
        this.set("playlistLength", trackListCollection.length);
        Backbone.Model.prototype.save.call(this, attrs, options);
    },

    addTrack: function(recordingModel, callback) {
        var that = this;
        this.fetch({success:function(){
            var trackListCollection = that.get("trackListCollection");
            trackListCollection.add(recordingModel);
            that.save({success:callback()},{silent:true});
        }});
    },

    whiteList: ['id','name','actID', 'actName', 'yearPublished','label','isAlbum','notes','trackList','playlistLength'],

    toJSON: function(){
        return _.pick(this.attributes, this.whiteList);
    }
});