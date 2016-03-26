var viewUtils = require('../helpers/viewUtils.js');
var RecordingModel = require('../models/recording.js');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,
    url: "api/recordings",
    sort_key: "title",

    initialize: function() {
        this.bind("remove", this.onRemove);
    },

    onRemove: function(model){
        model.destroy({wait: true});
        viewUtils.createNotification({
            message: "RECORDING DELETED<br />'" + model.get("title") + "' by " + model.get("actName"),
            autohide: true
        });
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