require('jquery-validation');
require('jquery-serializejson');
var template = require('./html/recordingEdit.html');
var RecordingForm = require("./recordingForm.js");

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingEditPanel",
    className: "addOrEditPanel",

    initialize: function() {
        this.model.bind('change', this.render, this);
    },

    events: {
        "click #cancelEditButton": "closePanel",
        "click #updateRecordingButton": "updateRecording"
    },

    closePanel: function() {
        X7.router.navigate('recordings/highlight/' + this.model.id, {trigger: true});
    },

    updateRecording: function (e) {

        e.preventDefault();

        var that = this,
            $infoForm = this.$el.find("#recordingInfo"),
            validator = $infoForm.validate();

        if (validator.form()) {

            this.model
                .set($infoForm.serializeJSON())
                .unset("artistOptions", {silent: true})
                .unset("artist", {silent: true})
                .save(null, {
                    success: function() {
                        X7.collections.recordings.fetch({
                            reset: true,
                            success: function(){
                                that.closePanel();
                            }
                        });
                    }
                });
        }
    },

    render: function () {
        this.$el.html(template());
        this.renderForm();
        this.$el.find("button").button();
        return this;
    },

    renderForm: function(){
        this.$el.find(".recordingInfoFormContainer")
            .html(new RecordingForm({
                model: this.model
            }).render().el);
    }
});