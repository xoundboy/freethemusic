
var RecordingModel = require('../models/recording.js');

module.exports = Backbone.Collection.extend({

    model: RecordingModel,
    url: "api/recordings",
    sort_key: "title",

    initialize: function() {
        this.bind("remove", function (model) {
            model.destroy({wait: true});
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
        return response.Recordings[0];
    }


});