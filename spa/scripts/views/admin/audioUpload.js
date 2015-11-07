x7.AudioUploadView = Backbone.View.extend({

    tagName: "div",
    id: "audioUploadContent",
    className: "audioUpload",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);

        // Start from the beginning
        this.model.setStep(1);
    },

    events: {
        "change #uploadFile": "initiateUpload",
        "click .registerInfoBtn": "registerInfo",
        "click .backBtn": "stepBack",
        "click .nextBtn": "stepForward",
        "click #step4NextBtn": "confirmUpload"
    },

    confirmUpload: function() {
        var recording = new x7.RecordingModel(this.model), that = this;
        recording.save(this.model, {
            success: function(model) {
                x7.models.dashboard.set("currentTabHref", "#recordings");
                //x7.views.recordings.highlightRecording(model.id);
                that.model.setStep(1);
            },
            error: function(model, response) {
                alert(response.responseJSON.exceptionType);
            }
        });
    },

    registerInfo: function (e) {

        e.preventDefault();

        var $infoForm = this.$el.find("#recordingInfo"),
            validator = $infoForm.validate();

        if (validator.form()) {
            this.model.set($infoForm.serializeJSON());
            this.model.set("selectedArtistText", this.$el.find("select[name=artistId] option:selected").html());
            this.model.set("selectedTypeText", this.$el.find("select[name=typeId] option:selected").html());
            if ($(e.currentTarget).attr("id") === "step3NextBtn") {
                this.stepForward();
            } else {
                this.stepBack();
            }
        };
    },

    stepBack: function() {
        this.model.stepBack();
    },

    stepForward: function() {
        this.model.stepForward();
    },

    initiateUpload: function (e) {

        var that = this,
            file = e.target.files[0],
            formData = new FormData(),
            xhr = new XMLHttpRequest();

        formData.append('file', file);
        xhr.open('POST', "/api/upload", true);
        xhr.onload = function (data) {
            var response = (JSON.parse(data.currentTarget.responseText));
            that.model.set("tempName", response.tempName);
            that.model.set("size", response.size);
            that.model.setStep(2);
        };
        xhr.onerror = function (data) {
            alert("error uploading the file");
            console.log(data);
        }
        xhr.send(formData);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        this.$el.find("button").button();

        // create the info form subview and render it
        var recordingInfoForm = new x7.RecordingAddEditView({
            model: this.model,
            template: x7.templates.recordingAddEdit
        });

        this.$el.find(".recordingInfoFormContainer").html(recordingInfoForm.render().el);

        this.$el.find(".datepicker").datepicker({
            changeMonth: true,
            changeYear: true
        });

        // sub-views need this
        this.delegateEvents();

        return this;
    }
});