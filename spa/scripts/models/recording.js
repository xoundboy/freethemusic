var utils = require('../utils.js');

module.exports = Backbone.Model.extend({

    urlRoot: "api/recording",

    parse: function (response) {
        if (response) {
            this.set(response);
            this.set("recDate", utils.formattedDate(response.recDate));
            this.set("formattedDuration", utils.formattedDuration(response.duration));
        }
    }

});