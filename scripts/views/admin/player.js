var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');
var config = require('../../config.js');

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    initialize: function (options) {

        var that = this;

        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', function(e){
            this.render();
        });

        // initialize the queue index at zero ready for the first track to be queued
        if (!this.getQueueIndex()){
            this.setQueueIndex(0);
        }

        // auto load the first queued track when it appears if no model is loaded
        if (!adminApp.collections.queue.length) {
            this.listenTo(adminApp.collections.queue, 'add', function () {
                that.loadQueueHeadButDontPlay();
                that.stopListening(adminApp.collections.queue, 'add');
                adminApp.views.player.play();
            });
        } else {
            that.loadQueueHeadButDontPlay();
        }

        this.render();
    },

    events: {
        "click #playPauseButton": "playPause",
        "click #nextButton": "skipForward",
        "click #prevButton": "skipBack"
    },

    getQueueIndex: function(){
        return parseInt(window.localStorage.getItem(config.LS_CURRENTLY_PLAYING_INDEX));
    },

    setQueueIndex: function(index){
        window.localStorage.setItem(config.LS_CURRENTLY_PLAYING_INDEX, index);
    },

    playPause: function(){
        this.model.playPause();
    },

    //play: function(){
    //    this.$el.find("audio").trigger('play');
    //    this.model.set("isPlaying", true);
    //},
//
    //pause: function(){
    //    this.$el.find("audio").trigger('pause');
    //    this.model.set("isPlaying", false);
    //},

    loadQueueHeadButDontPlay: function(){
        this.changeModel();
    },

    skipForward: function(){
        var index = this.getQueueIndex();
        if (adminApp.collections.queue.length > (index + 1)){
            this.setQueueIndex(index + 1);
        }
        this.changeModel();
    },

    skipBack: function(){
        var index = this.getQueueIndex();
        if (index > 0) {
            this.setQueueIndex(index - 1);
        }
        this.changeModel();
    },

    changeModel: function(){
        // TODO unbind stuff first


        this.model.loadRecordingModel(adminApp.collections.queue.at(this.getQueueIndex()).attributes);
        // re-render the queue so that the currently playing item gets highlighted
        adminApp.views.queue.render();
    },

    styleButtons: function(){
        var playPauseButtonIcon = (this.model.get("isPlaying")) ? "ui-icon-pause" : "ui-icon-play";
        var nextButtonDisabled = false,//(adminApp.collections.queue.length < 2),
            prevButtonDisabled = false;//(adminApp.collections.queueHistory.length == 0);

        utils.styleButton(this.$el.find("#nextButton"), "ui-icon-arrowthickstop-1-e", false, nextButtonDisabled);
        utils.styleButton(this.$el.find("#prevButton"), "ui-icon-arrowthickstop-1-w", false, prevButtonDisabled);
        utils.styleButton(this.$el.find(".dummyPlus"), "ui-icon-plusthick");
        utils.styleButton(this.$el.find("#playPauseButton"), playPauseButtonIcon);
    },

    render: function(){

        var that = this;
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        this.styleButtons();

        // sub-views need this
        this.delegateEvents();

        this.$el.find("audio").bind('ended', function(){
            that.model.loadNextTrackFromQueue();
            that.model.set("isPlaying", false);
        });

        if (this.model.get("isPlaying")){
           this.$el.find("audio").trigger("play");
        }

        return this;
    }
});
