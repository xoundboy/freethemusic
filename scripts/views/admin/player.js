var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    initialize: function (options) {

        var that = this;

        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', this.render);

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

    play: function(){
        this.$el.find("audio").trigger('play');
    },

    loadQueueHeadButDontPlay: function(){
        this.changeModel(adminApp.collections.queue.at(0));
    },

    skipForward: function(){
        if (adminApp.collections.queue.length > 1){
            this.changeModel(adminApp.collections.queue.getNextTrack());
            this.play();
        }
    },

    skipBack: function(){
        if (adminApp.collections.queueHistory.length > 0) {
            adminApp.collections.queue.pushRecording(this);
            this.changeModel(adminApp.collections.queueHistory.getMostRecentTrack());
            this.play();
        }
    },

    changeModel: function(newModel){
        // TODO unbind stuff first
        this.model.set(newModel.attributes);
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
