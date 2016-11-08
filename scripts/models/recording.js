var utils = require('../helpers/commonUtils.js');

module.exports = Backbone.Model.extend({

    urlRoot: "api/recording",

    defaults: {
        currentlyPlaying: false
    },

    parse: function (response) {
        if (response) {
            this.set(response);
            this.set("recDate", utils.formattedDate(response.recDate));
        }
    }

});