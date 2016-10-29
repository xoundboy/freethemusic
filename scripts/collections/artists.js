var notification = require('../helpers/notification');
var ArtistModel = require('../models/artist');
var util = require('../helpers/commonUtils');

module.exports = Backbone.Collection.extend({

    model: ArtistModel,
    url: "api/artist/all",
    sort_key: "actName",

    initialize: function() {
        this.bind("remove", function (model) {
            model.destroy({wait: true});
            notification.create({
                message: "ARTIST DELETED<br />" + model.get("actName"),
                autohide: true
            });
        });
    },

    resetModels: function(models){
        this.reset(null);
        if (util.isArray(models)){
            for (var index in models){
                var model = new ArtistModel(models[index]);
                this.add(model);
            }
        }
    }
});