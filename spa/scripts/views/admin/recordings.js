require('jquery-ui/effect');
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

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
        "click .previewButton"          : "preview",
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

    preview: function (e) {

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

    addToQueue: function(e){

        var $btn = $(e.currentTarget),
            recordingId = $btn.closest("tr").attr("data-recordingId");
        adminApp.collections.queue.pushRecording(this.collection.get(recordingId));
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
        this.$el.find(".previewButton").button({
            text: false,
            icons: {
                primary: "ui-icon-play"
            }
        });
        this.$el.find(".plusButton").button({
            text: false,
            icons: {
                primary: "ui-icon-plusthick"
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