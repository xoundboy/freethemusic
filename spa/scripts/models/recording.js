var BackboneDeepModel = require('backbone-nested-model');

module.exports = BackboneDeepModel.extend({
    urlRoot: "api/Recordings",

    formattedDate: function (date) {
        var d = new Date(date);
        return d.getMonthFormatted() + "/" + d.getDateFormatted() + '/' + d.getFullYear();
    },

    parse: function (response) {
        if (response) {
            this.set(response);
            this.set("date", this.formattedDate(response.date));
        }
    }

});