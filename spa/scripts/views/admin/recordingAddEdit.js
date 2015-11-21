require('jquery-ui/datepicker');

var _ = require('underscore');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    id: "recordingEditContent",
    className: "recordingEdit",

    initialize: function(options) {
        _.extend(this, _.pick(options, "template"));
        this.model.set("artistOptions", adminApp.collections.artists.toJSON(), {silent: true});
        this.model.bind('change', this.render, this);
    },

    updateSelects: function () {
        var selectedArtistValue = parseInt(this.model.get("actID")),
            selectedType = parseInt(this.model.get("typeID"));

        this.$el.find("select[name=actID]")
            .find("option[value=" + selectedArtistValue + "]")
            .attr("selected", true);

        this.$el.find("select[name=typeID]")
            .find("option[value=" + selectedType + "]")
            .attr("selected", true);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        this.$el.find(".datepicker").datepicker({
            changeMonth: true,
            changeYear: true
        });
        this.updateSelects();
        return this;
    }
});