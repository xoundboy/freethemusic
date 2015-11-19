var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

var RecordingEditPanelView = require('./recordingEditPanel.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingsContent",
    className: "recordings",
    audio: new Audio(),    nowPlayingId: null,
    selectedId: null,

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'reset sort remove fetch change', this.render);
        this.collection.fetch();
        this.audio.addEventListener('error', $.proxy(this.handleAudioLoadError, this));
    },

    events: {
        "click th": "sortColumn",
        "click .previewButton": "previewTrack",
        "click .editRecordingButton": "editRecordingInfo",
        "click .deleteRecordingButton": "deleteRecording",
        "click a[href=#uploads]": "gotoUploads",
        "click .addRecordingButton" : "gotoUploads"
    },

    gotoUploads: function(e){
        adminApp.routers.main.navigate("/audioUpload", {trigger: true});
    },

    editRecordingInfo: function(e) {
        var $btn = $(e.currentTarget),
            $tr = $btn.closest("tr"),
            recordingId = $tr.attr("data-recordingId");

        var recordingModel = this.collection.get(recordingId);

        var recordingEditPanel = new RecordingEditPanelView({
            model: recordingModel,
            template: $('#template_recordingEditPanel').html()
        });

        // get rid of any existing edit panels
        this.$el.find("#recordingEditPanel").remove();

        // render a new edit panel
        $tr.after(recordingEditPanel.render().el);
    },

    deleteRecording: function (e) {

        var $btn = $(e.currentTarget),
            recordingId = $btn.closest("tr").attr("data-recordingId");
        if (this.nowPlayingId === recordingId) {
            this.audio.pause();
        }
        if (confirm("Are you sure you want to delete this recording?")){
            this.collection.remove(this.collection.get(recordingId));
        }
    },

    highlightRecording: function (id) {
        var that = this;
        this.collection.fetch({
            success: function(collection, response, options) {
                that.$el.find("#recordingId-" + id).addClass("highlighted");
            }
        });
    },

    previewTrack: function (e) {

        var $btn = $(e.currentTarget),
            recordingId = $btn.closest("tr").attr("data-recordingId"),
            src = "assets/audio/" + $btn.attr("data-fileName");

        // stop if the now playing track was clicked
        if ($btn.hasClass("nowPlaying")) {
            $btn.removeClass("nowPlaying");
            this.audio.pause();
            this.nowPlayingId = null;
            return;
        }

        $(".previewButton").removeClass("nowPlaying");

        this.audio.src = src;
        this.audio.play();
        $btn.addClass("nowPlaying");
        this.nowPlayingId = recordingId;
    },

    sortColumn: function(e) {
        var field = $(e.target).attr("bengrid-key");

        if (field) {
            this.collection.sortByField(field);
        }
    },

    handleAudioLoadError: function (e) {
        $("#recordingId-" + this.nowPlayingId).addClass("loadError");
        $(".previewButton").removeClass("nowPlaying");
        // todo should set a flag in the db that audio is broken
    },

    styleButtons: function() {
        this.$el.find(".previewButton").button({
            text: false,
            icons: {
                primary: "ui-icon-play"
            }
        });
        this.$el.find(".editRecordingButton").button({
            text: false,
            icons: {
                primary: "ui-icon-pencil"
            }
        });
        this.$el.find(".deleteRecordingButton").button({
            text: false,
            icons: {
                primary: "ui-icon-trash"
            }
        });
        this.$el.find(".addRecordingButton").button({
            icons: {
                primary: "ui-icon-plusthick"
            }
        });
    },

    select: function(id){
        this.selectedId = id;
    },

    render: function () {

        var compiledTemplate = Mustache.to_html(this.template, { recordings: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        this.styleButtons();

        // sub-views need this
        this.delegateEvents();

        // highlight the selected row
        if (this.selectedId){
            this.$el.find("tr").removeClass("highlighted");
            this.$el.find("#recordingId-" + this.selectedId).addClass("highlighted");

            var element = document.getElementsByClassName('highlighted')[0];
            if (element){
                element.scrollIntoView();
            }
        }



        return this;
    }

});