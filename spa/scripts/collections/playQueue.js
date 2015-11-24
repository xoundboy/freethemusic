var RecordingModel = require('../models/recording.js');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,

    addRecording: function(recording, position){
        this.add(recording, {at: position});
    }

});