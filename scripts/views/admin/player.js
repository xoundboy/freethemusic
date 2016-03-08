var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');
var config = require('../../config.js');
require('jquery-ui/slider');

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    interval: null,

    initialize: function (options) {

        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', function(e){
            this.render();
        });

        this.render();
    },

    events: {
        "click #playPauseButton": "playPause",
        "click #nextButton": "skipForward",
        "click #prevButton": "skipBack"
    },

    playPause: function(){
        this.model.playPause();
    },

    skipForward: function(){
        this.model.loadNext();
    },

    skipBack: function(){
        this.model.loadPrevious();
    },

    styleButtons: function(){
        var playPauseButtonIcon = (this.model.isPlaying()) ? "ui-icon-pause" : "ui-icon-play";
        var nextButtonDisabled = false,//(adminApp.collections.queue.length < 2),
            prevButtonDisabled = false;//(adminApp.collections.queueHistory.length == 0);

        utils.styleButton(this.$el.find("#nextButton"), "ui-icon-arrowthickstop-1-e", false, nextButtonDisabled);
        utils.styleButton(this.$el.find("#prevButton"), "ui-icon-arrowthickstop-1-w", false, prevButtonDisabled);
        utils.styleButton(this.$el.find(".dummyPlus"), "ui-icon-plusthick");
        utils.styleButton(this.$el.find("#playPauseButton"), playPauseButtonIcon);
    },

    initProgressBar: function(){

    },

    render: function(){
        var model = this.model.get("loadedModel") || null;
        var that = this;
        var attributes = (model) ? model.attributes : null;
        var compiledTemplate = Mustache.to_html(this.template, {loadedModel: attributes});
        this.$el.html(compiledTemplate);
        this.styleButtons();

        var audioEl = this.model.audioElement.elem;

        clearInterval(this.interval);

        var $sliderEl = this.$el.find("#progressBar");

        $sliderEl.slider({
            max: audioEl.duration,
            value: that.model.audioElement.elem.currentTime,
            start: function(){
                clearInterval(that.interval);
            },
            stop: function(e, ui){
                that.model.audioElement.play(ui.value);
                startUpdatingProgress();
            }
        });

        function startUpdatingProgress(){
            that.interval = setInterval(function(){
                $sliderEl.slider("value", that.model.audioElement.elem.currentTime);
            }, 200);
        }
        if(that.model.isPlaying()){
            startUpdatingProgress();
        } else {
            clearInterval(that.interval);
        }



        // sub-views need this
        this.delegateEvents();
        return this;
    }
});
