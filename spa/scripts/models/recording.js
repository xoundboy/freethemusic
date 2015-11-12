module.exports = Backbone.Model.extend({
    urlRoot: "api/recordings",

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