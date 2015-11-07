x7.RecordingsCollection = Backbone.Collection.extend({

    model: x7.RecordingModel,
    url: "api/Recordings",
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

});