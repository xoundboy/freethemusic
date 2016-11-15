require('jquery-ui/button');
var $ = require('jquery');
var Backbone = require('backbone');
var notification = require('../helpers/notification.js');
var utils = require('../helpers/commonUtils.js');

var RecordingAddEdit = require('./recordingForm.js');
var RecordingModel = require('../models/recording.js');
var template = require('./html/audioUpload.html');
var ajax = require('../core/ajax.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "audioUploadContent",
    model: {},

    initialize: function () {
        this.model.bind('change', this.render, this);
        this.formData = new FormData();

        // Start from the beginning
        this.model.setStep(1);
    },

    events: {
        "change #uploadFile": "initiateUpload",
        "click .backBtn": "stepBack",
        "click .nextBtn": "stepForward",
        "click .finishBtn": "finish",
        "change #actID": "selectArtist",
        "click .breadcrumbs span": "breadcrumbNav"
    },

    breadcrumbNav: function(e){
        var targetStep = $(e.currentTarget).index() + 1;
        this.stashFormData();
        this.goToStep(targetStep);
    },

    goToStep: function(step){
        X7.router.navigate('recording/add/' + step, {trigger: true});
    },

    initiateUpload: function (e) {

        this.file = e.target.files[0];

        // show the "uploading" message
        this.loadingMessage = notification.create({
            message: "Uploading file to server, please wait..."
        });

        // empty the temporary uploads folder on the server
        ajax.requestWithToken({
            method: 'DELETE',
            url: '/api/upload/removeTempDir',
            success: $.proxy(this.onDeleteSuccess, this),
            error: this.onDeleteError
        });
    },

    onDeleteSuccess: function(){
        this.formData.append('uploadFile', this.file);
        ajax.requestWithToken({
            method: 'POST',
            url: "/api/upload/recording",
            success: $.proxy(this.onUploadSuccess, this),
            error: $.proxy(this.onUploadError, this),
            data: this.formData
        });
    },

    onDeleteError: function(){
        console.log("could not recreate the remote uploads folder");
    },

    onUploadSuccess: function (data) {
        var response = (JSON.parse(data.currentTarget.responseText));
        this.model.set("tempName", response.tempName);
        this.model.set("size", response.size);
        this.loadingMessage.close();
        this.goToStep(2);
    },

    onUploadError: function (data) {
        alert("error uploading the file");
        console.log(data);
    },

    finish: function() {

        var recording = new RecordingModel();

        var modelCheck = this.model.validate();

        if (modelCheck.isReadyToSave){
            recording.save(this.model.getSaveProps(), {
                success: $.proxy(this.onModelSaveSuccess, this),
                error: $.proxy(this.onModelSaveError, this)
            });
        } else {
            alert(modelCheck.errorMessage);
        }
    },

    onModelSaveError: function(model, response, options) {
        console.log(model);
        console.log(response);
        console.log(options);
    },

    onModelSaveSuccess: function(data) {
        this.model.clear().set(this.model.defaults);
        this.model.setStep(1);
        X7.router.navigate('/recordings/highlight/' + data.id, {trigger: true});
    },

    stashFormData: function(){
        this.model.set(this.$el.find("#newRecordingInfo").serializeJSON());
        var actName = this.$el.find("select[name=actID] option:selected").html();
        this.model.set("actName", actName);
    },

    stepBack: function() {
        this.stashFormData();
        var cs = this.model.get("currentStep");
        if (cs > 1) {
            this.goToStep(cs - 1);
        }
    },

    stepForward: function() {
        this.stashFormData();
        if (this.model.get("currentStep") === 3 && !this.$el.find("#newRecordingInfo").validate().form()) {
            return;
        }

        var cs = this.model.get("currentStep"),
            sc = this.model.get("stepCount");
        if (cs < sc) {
            this.goToStep(cs + 1);
        }
    },

    selectArtist: function(e){
        if(e.target.value === "new"){
            this.stashFormData();
            var returnUrl = encodeURIComponent('recording/add/3');
            X7.router.navigate("/artist/add?returnUrl=" + returnUrl , {trigger:true});
        }
    },

    onAudioTagMetaDataLoaded: function (e) {
        this.model.set('duration', utils.formattedDuration(e.target.duration));
    },

    render: function () {
        this.$el.html(template(this.model.attributes)).show();

        // only for step 2
        if(this.model.get('step2')){

            // get the audio file's duration from the audio object
            if (!this.model.get('duration')){
                var audioTag = document.getElementById("uploadedFile");
                if (audioTag) {
                    audioTag.addEventListener('loadedmetadata', $.proxy(this.onAudioTagMetaDataLoaded, this), false);
                }
            }
        }

        // only for step 3
        if(this.model.get("step3")){
            this.model.set("isUploadFlow", true);
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