﻿require('jquery-ui/button');
var $ = require('jquery');
var _ = require('underscore');
var Mustache = require('mustache');
var Backbone = require('backbone');
var utils = require('../../utils.js');

var RecordingAddEdit = require('./recordingAddEdit.js');
var RecordingModel = require('../../models/recording.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "audioUploadContent",
    className: "audioUpload",
    model: {},

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);

        // Start from the beginning
        this.model.setStep(1);
    },

    events: {
        "change #uploadFile": "initiateUpload",
        "click .backBtn": "stepBack",
        "click .nextBtn": "stepForward",
        "click #step3BackBtn": "backToStepTwo",
        "click #step3NextBtn": "onToStepFour",
        "click #step4NextBtn": "confirmUpload",
        "change #actID": "selectArtist"
    },

    initiateUpload: function (e) {

        var that = this,
            file = e.target.files[0],
            formData = new FormData(),
            xhr_removeuploads = new XMLHttpRequest(),
            xhr_upload = new XMLHttpRequest();

        // show the "uploading" message
        var loadingMessage = utils.createNotification({
            message: "Uploading file to server, please wait..."
        });

        // empty the temporary uploads folder on the server
        xhr_removeuploads.open('DELETE', '/api/removetempuploads', true);
        xhr_removeuploads.onload = function(){

            formData.append('uploadFile', file);
            xhr_upload.open('POST', "/api/upload", true);
            xhr_upload.onload = function (data) {
                var response = (JSON.parse(data.currentTarget.responseText));
                that.model.set("tempName", response.tempName);
                that.model.set("size", response.size);
                loadingMessage.close();
                that.model.setStep(2);
            };
            xhr_upload.onerror = function (data) {
                alert("error uploading the file");
                console.log(data);
            };
            xhr_upload.send(formData);
        };
        xhr_removeuploads.onerror = function(){
            console.log("could not recreate the remote uploads folder");
        };
        xhr_removeuploads.send();
    },

    confirmUpload: function() {

        var recording = new RecordingModel(),
            that = this;

        recording.save(this.model.getSaveProps(), {
            success: function(data) {
                adminApp.collections.recordings.fetch({
                    reset: true,
                    success: function(){
                        that.model.clear().set(that.model.defaults);
                        that.model.setStep(1);
                        adminApp.routers.main.navigate('/recordings/highlight/' + data.id, {trigger: true});
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            },
            error: function(model, response, options) {
                console.log(model);
                console.log(response);
                console.log(options);
            }
        });
    },

    backToStepTwo: function(){
        this.stashFormData();
        this.stepBack();
    },

    onToStepFour: function () {
        this.stashFormData();
        if (this.$el.find("#newRecordingInfo").validate().form()) {
            this.model.stepForward();
        }
    },

    stashFormData: function(){
        this.model.set(this.$el.find("#newRecordingInfo").serializeJSON());
        this.model.set("actName", this.$el.find("select[name=actID] option:selected").html());
    },

    stepBack: function() {
        this.model.stepBack();
    },

    stepForward: function() {
        this.model.stepForward();
    },

    selectArtist: function(e){
        if(e.target.value === "new"){
            this.stashFormData();
            adminApp.routers.main.navigate("/artists", {trigger:true});
        }
    },

    render: function () {

        var that = this;
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);


        // only for step 2
        if(this.model.get('step2')){

            // get the audio file's duration from the audio object
            if (!this.model.get('duration')){
                var audioTag = document.getElementById("uploadedFile");
                audioTag.addEventListener('loadedmetadata', function(e){
                    that.model.set('duration', utils.formattedDuration(audioTag.duration));
                }, false);
            }
        }

        // only for step 3
        if(this.model.get("step3")){
            var recordingInfoForm = new RecordingAddEdit({
                model: this.model,
                template: $("#template_recordingAddEdit").html()
            });
            this.$el.find(".newRecordingInfoFormContainer").html(recordingInfoForm.render().el);
            this.$el.find(".datepicker").datepicker({
                changeMonth: true,
                changeYear: true
            });
        }

        this.$el.find("button").button();

        // sub-views need this
        this.delegateEvents();

        return this;
    }
});