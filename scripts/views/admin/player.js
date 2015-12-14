var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');

var indexKey = "x71-queue-index";

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    initialize: function (options) {

        var that = this;

        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', this.render);

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
        "click #nextButton": "skipForward",
        "click #prevButton": "skipBack"
    },

    getQueueIndex: function(){
        return parseInt(window.localStorage.getItem(indexKey));
    },

    setQueueIndex: function(index){
        window.localStorage.setItem(indexKey, index);
    },

    play: function(){
        this.$el.find("audio").trigger('play');
    },

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
        this.model.set(adminApp.collections.queue.at(this.getQueueIndex()).attributes);
    },

    styleButtons: function(){

        var nextButtonDisabled = false,//(adminApp.collections.queue.length < 2),
            prevButtonDisabled = false;//(adminApp.collections.queueHistory.length == 0);

        utils.styleButton(this.$el.find("#nextButton"), "ui-icon-arrowthickstop-1-e", false, nextButtonDisabled);
        utils.styleButton(this.$el.find("#prevButton"), "ui-icon-arrowthickstop-1-w", false, prevButtonDisabled);
        utils.styleButton(this.$el.find(".dummyPlus"), "ui-icon-plusthick");
    },

    render: function(){

        var that = this;
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        this.styleButtons();

        // sub-views need this
        this.delegateEvents();

        this.$el.find("audio").bind('ended', function(){
            console.log("playback ended");
            that.model.loadNextTrackFromQueue();
        });

        return this;
    }
});
