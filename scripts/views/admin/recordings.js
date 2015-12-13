require('jquery-ui/effect');
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingsContent",
    className: "recordings",
    audio: new Audio(),
    nowPlayingId: null,

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'reset sort change remove', this.render);
        this.collection.fetch({reset:true});
        this.audio.addEventListener('error', $.proxy(this.handleAudioLoadError, this));
    },

    events: {
        "click th"                      : "sort",
        "click .playButton"             : "play",
        "click .plusButton"             : "addToQueue",
        "click .editRecordingButton"    : "edit",
        "click .deleteRecordingButton"  : "delete",
        "click a[href=#uploads]"        : "add",
        "click .addRecordingButton"     : "add"
    },

    add: function(){
        adminApp.routers.main.navigate("/recording/add", {trigger: true});
    },

    edit: function(e) {
        var recID = $(e.currentTarget).closest("tr").attr("data-recordingId");
        adminApp.routers.main.navigate('recording/edit/' + recID, {trigger:true});
    },

    delete: function (e) {
        var $btn = $(e.currentTarget),
            recordingId = $btn.closest("tr").attr("data-recordingId");
        if (this.nowPlayingId === recordingId) {
            this.audio.pause();
        }
        if (confirm("Are you sure you want to delete this recording?")){
            var modelToDelete = this.collection.get(recordingId);
            this.collection.remove(modelToDelete);
        }
    },

    play: function (e) {
        var recordingId = $(e.currentTarget).closest("tr").attr("data-recordingId");
        console.log(recordingId);
        adminApp.models.player.load(this.collection.get(recordingId), true);
    },

    addToQueue: function(e){

        var $btn = $(e.currentTarget),
            recordingId = $btn.closest("tr").attr("data-recordingId");
        adminApp.collections.queue.pushRecording(this.collection.get(recordingId));
//
        // show onboarding help for first time a user adds a track to the queue
        //console.log(adminApp.collections.queue.length);
        //if (!adminApp.collections.queue.length){
        //    utils.createNotification({
        //        message: "Thank queue!<br />You can queue up as many tracks as you like",
        //        okButtonText: "Take me to the queue"
        //    });
        //}
    },

    sort: function(e) {
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
        utils.styleButton(this.$el.find(".playButton"), "ui-icon-play");
        utils.styleButton(this.$el.find(".plusButton"), "ui-icon-plusthick");
        utils.styleButton(this.$el.find(".editRecordingButton"), "ui-icon-pencil");
        utils.styleButton(this.$el.find(".deleteRecordingButton"), "ui-icon-trash");
        utils.styleButton(this.$el.find(".addRecordingButton"), "ui-icon-plusthick", true);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, { recordings: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        this.styleButtons();

        // Sub-views need this or events associated with
        // previous renderings of the view will be lost.
        this.delegateEvents();

        return this;
    }

});