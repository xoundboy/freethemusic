var config = require('../../config.js');
var recordingModel = require('../models/recording.js');

module.exports = new (Backbone.Collection.extend({

    model: recordingModel,
    url: config.databaseUrl + "api/Recordings",
    sort_key: "name",

    initialize: function() {
        this.bind("remove", function (model) {
            model.destroy();
        });
    },

    comparator: function(item) {
        return item.get(this.sort_key);
    },

    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    }

}))();