x7.RecordingEditPanelView = Backbone.View.extend({

    tagName: "tr",
    id: "recordingEditPanel",
    className: "recordingEditPanel",

    initialize: function(options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    events: {
        "click #cancelEditButton": "closePanel",
        "click #updateRecordingButton": "updateRecording"
    },

    closePanel: function() {
        this.remove();
    },

    updateRecording: function (e) {

        var that = this;

        e.preventDefault();

        var $infoForm = this.$el.find("#recordingInfo"),
            validator = $infoForm.validate();

        if (validator.form()) {
            this.model
                .set($infoForm.serializeJSON())
                .unset("artistOptions", {silent: true})
                .unset("typeOptions", {silent: true})
                .unset("artist", {silent: true})
                .unset("type", {silent: true})
                .save({}, {
                    success: function() {
                        //that.closePanel();
                        //x7.collections.recordings.fetch();
                        //x7.views.recordings.highlightRecording(that.model.id);
                    }
                });
        };
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template);
        this.$el.html(compiledTemplate);

        // create the info form subview and render it
        var recordingInfoForm = new x7.RecordingAddEditView({
            model: this.model,
            template: x7.templates.recordingAddEdit
        });

        this.$el.find(".recordingInfoFormContainer").html(recordingInfoForm.render().el);

        this.$el.find("button").button();

        return this;
    }

});