require('jquery-ui/button');
var $ = require('jquery');
var Backbone = require('backbone');
var notification = require('../helpers/notification.js');
var utils = require('../helpers/commonUtils.js');

var RecordingAddEdit = require('./recordingForm.js');
var RecordingModel = require('../models/recording.js');
var template = require('./html/audioUpload.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "audioUploadContent",
    model: {},

    initialize: function () {
        this.model.bind('change', this.render, this);

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

        var that = this,
            file = e.target.files[0],
            formData = new FormData(),
            xhr_removeuploads = new XMLHttpRequest(),
            xhr_upload = new XMLHttpRequest();

        // show the "uploading" message
        var loadingMessage = notification.create({
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
                that.goToStep(2);
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

    finish: function() {

        var recording = new RecordingModel(),
            that = this;

        var modelCheck = this.model.validate();

        if (modelCheck.isReadyToSave){
            recording.save(this.model.getSaveProps(), {
                success: function(data) {
                    X7.collections.recordings.fetch({
                        reset: true,
                        success: function(){
                            that.model.clear().set(that.model.defaults);
                            that.model.setStep(1);
                            X7.router.navigate('/recordings/highlight/' + data.id, {trigger: true});
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
        } else {
            alert(modelCheck.errorMessage);
        }
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

    render: function () {

        var that = this;
        this.$el.html(template(this.model.attributes)).show();


        // only for step 2
        if(this.model.get('step2')){

            // get the audio file's duration from the audio object
            if (!this.model.get('duration')){
                var audioTag = document.getElementById("uploadedFile");
                if (audioTag) {
                    audioTag.addEventListener('loadedmetadata', function (e) {
                        that.model.set('duration', utils.formattedDuration(audioTag.duration));
                    }, false);
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