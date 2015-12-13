require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

var RecordingAddEditView = require("./recordingAddEdit.js");
var utils = require('../../utils.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingEditPanel",
    className: "addOrEditPanel",

    initialize: function(options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    events: {
        "click #cancelEditButton": "closePanel",
        "click #updateRecordingButton": "updateRecording"
    },

    closePanel: function() {
        adminApp.routers.main.navigate('recordings/highlight/' + this.model.id, {trigger: true});
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
                        adminApp.collections.recordings.fetch({
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
        var compiledTemplate = Mustache.to_html(this.template);
        this.$el.html(compiledTemplate);

        // create the info form subview and render it
        var recordingInfoForm = new RecordingAddEditView({
            model: this.model,
            template: $("#template_recordingAddEdit").html()
        });

        this.$el.find(".recordingInfoFormContainer").html(recordingInfoForm.render().el);

        this.$el.find("button").button();

        return this;
    }

});