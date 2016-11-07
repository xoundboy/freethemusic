var _ = require('underscore');
var utils = require('../helpers/commonUtils');
var TrackListCollection = require('../collections/trackList');

module.exports = Backbone.Model.extend({

    urlRoot: "api/playlist",

    parse: function(response){
        response.isAlbum = response.isAlbum !== "false";
        response.images = response.images === undefined || response.images === "" ? null
            : JSON.parse(response.images);
        response.trackListCollection = this.generateTrackListCollection(response.trackList);
        response.trackList = "see trackListCollection attribute";
        return response;
    },

    generateTrackListCollection: function(idArrayString){
        var trackListArray = utils.parseJSON(idArrayString);
        var collection = new TrackListCollection();
        collection.populateByIdArray(trackListArray);
        return collection;
    },

    save: function(attrs, options) {
        var trackListCollection = this.get("trackListCollection");
        this.set("trackList", trackListCollection.exportIdArray());
        this.set("playlistLength", trackListCollection.length);
        Backbone.Model.prototype.save.call(this, attrs, options);
    },

    addTrack: function(recordingModel, callback) {
        var trackListCollection = this.get("trackListCollection");
        trackListCollection.add(recordingModel);
        this.save({success:callback()},{silent:true});
    },

    whiteList: ['id','name','actID', 'actName', 'yearPublished','label','isAlbum','notes','trackList','playlistLength'],

    toJSON: function(){
        return _.pick(this.attributes, this.whiteList);
    }
});