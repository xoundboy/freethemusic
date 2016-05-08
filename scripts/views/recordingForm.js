require('jquery-ui/datepicker');
var template = require('./html/recordingForm.html');

module.exports = Backbone.View.extend({

    id: "recordingEditContent",
    className: "addOrEditPanel",

    initialize: function(options) {
        this.model.set("artistOptions", X7.collections.artists.toJSON(), {silent: true});
        this.model.bind('change', this.render, this);
    },

    updateSelect: function () {
        var selectedArtistValue = parseInt(this.model.get("actID"));
        this.$el.find("select[name=actID]")
            .find("option[value=" + selectedArtistValue + "]")
            .attr("selected", true);
    },

    render: function () {
        this.$el.html(template(this.model.attributes));
        this.$el.find(".datepicker").datepicker({
            changeMonth: true,
            changeYear: true
        });
        this.updateSelect();
        return this;
    }
});