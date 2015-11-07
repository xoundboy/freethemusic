x7.RecordingModel = Backbone.DeepModel.extend({
    urlRoot: "api/Recordings",

    parse: function (response) {
        if (response) {
            this.set(response);
            this.set("date", this.formattedDate(response.date));
        }
    },

    formattedDate: function (date) {
        var d = new Date(date);
        return d.getMonthFormatted() + "/" + d.getDateFormatted() + '/' + d.getFullYear();
    }

});