/**
 * Created by xoundboy on 01/05/16.
 */

//var RecordingModel = require('../models/recording.js');
var TrackModel = require('../models/track.js');

module.exports = Backbone.Collection.extend({
    model: TrackModel
});