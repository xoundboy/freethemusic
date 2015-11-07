x7.RecordingAddEditView = Backbone.View.extend({

    id: "recordingEditContent",
    className: "recordingEdit",

    initialize: function(options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    updateSelects: function () {
        var selectedArtistValue = this.model.get("artistId"),
            selectedType = this.model.get("typeId");

        this.$el.find("select[name=artistId]")
            .find("option[value=" + parseInt(selectedArtistValue) + "]")
            .attr("selected", true);

        this.$el.find("select[name=typeId]")
            .find("option[value=" + parseInt(selectedType) + "]")
            .attr("selected", true);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        this.$el.find(".datepicker").datepicker();
        this.updateSelects();
        return this;
    }
});