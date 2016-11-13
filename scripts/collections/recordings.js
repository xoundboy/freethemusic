var notification = require('../helpers/notification');
var RecordingModel = require('../models/recording');
var util = require('../helpers/commonUtils');
var TracklistCollection = require('./trackList');

module.exports = TracklistCollection.extend({

    url: "api/recording/all",

    initialize: function() {
        this.constructor.__super__.initialize.apply(this, arguments);
        this.bind("remove", this.onRemove);
    },

    onRemove: function(model){
        model.destroy({wait: true});
        notification.create({
            message: "RECORDING DELETED<br />'" + model.get("title") + "' by " + model.get("actName"),
            autohide: true
        });
    },

    resetModels: function(models){
        this.reset(null);
        if (util.isArray(models)){
            for (var index in models){
                var model = new RecordingModel(models[index]);
                this.add(model);
            }
        }
    }
});