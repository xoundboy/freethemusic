require('jquery-ui/datepicker');

var _ = require('underscore');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    id: "recordingEditContent",
    className: "addOrEditPanel",

    initialize: function(options) {
        _.extend(this, _.pick(options, "template"));
        this.model.set("artistOptions", adminApp.collections.artists.toJSON(), {silent: true});
        this.model.bind('change', this.render, this);
    },

    updateSelect: function () {
        var selectedArtistValue = parseInt(this.model.get("actID"));
        this.$el.find("select[name=actID]")
            .find("option[value=" + selectedArtistValue + "]")
            .attr("selected", true);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        this.$el.find(".datepicker").datepicker({
            changeMonth: true,
            changeYear: true
        });
        this.updateSelect();
        return this;
    }
});