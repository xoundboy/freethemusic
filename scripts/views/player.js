var _ = require('underscore');
var $ = require('jquery');
var button = require('../helpers/button.js');
var config = require('../config.js');
require('jquery-ui/slider');
var template = require('./html/player.html');

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    interval: null,

    initialize: function () {

        this.listenTo(this.model, 'change', function(){
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
        var nextButtonDisabled = false,//(X7.collections.queue.length < 2),
            prevButtonDisabled = false;//(X7.collections.queueHistory.length == 0);
        button.style(this.$el.find("#nextButton"), "ui-icon-arrowthickstop-1-e", false, nextButtonDisabled);
        button.style(this.$el.find("#prevButton"), "ui-icon-arrowthickstop-1-w", false, prevButtonDisabled);
        button.style(this.$el.find(".dummyPlus"), "ui-icon-plusthick");
        button.style(this.$el.find("#playPauseButton"), playPauseButtonIcon);
    },

    initProgressBar: function(){
        var that = this;
        var $sliderEl = this.$el.find("#progressBar");
        var audioEl = this.model.audioElement.elem;

        stopUpdating();
        if(that.model.isPlaying()){
            startUpdatingProgress();
        }

        $sliderEl.slider({
            max: audioEl.duration,
            value: that.model.audioElement.elem.currentTime,
            start: function(){
                stopUpdating();
            },
            stop: function(e, ui){
                that.model.audioElement.play(ui.value);
                startUpdatingProgress();
            }
        });

        function stopUpdating(){
            clearInterval(that.interval);
        }

        function startUpdatingProgress(){
            that.interval = setInterval(function(){
                $sliderEl.slider("value", that.model.audioElement.elem.currentTime);
            }, 200);
        }
    },

    render: function(){
        var model = this.model.get("loadedModel") || null;
        var attributes = (model) ? model.attributes : null;
        this.$el.html(template({loadedModel: attributes}));
        this.styleButtons();

        this.initProgressBar();

        // sub-views need this
        this.delegateEvents();
        return this;
    }
});
