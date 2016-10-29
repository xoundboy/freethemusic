var notification = require('../helpers/notification');
var RecordingModel = require('../models/recording');
var util = require('../helpers/commonUtils');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,
    url: "api/recording/all",
    sort_key: "title",

    initialize: function() {
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
    },

    comparator: function(item) {
        return item.get(this.sort_key);
    },

    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    },

    parse: function (response) {
        return response[0];
    }

});