require('jquery-ui/button');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playerPanel",
    className: "playerPanel",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    events: {
        
    },

    render: function () {

        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        // sub-views need this
        this.delegateEvents();

        if (this.model.get("empty")) {

            var $searchBtn = $('#emptyPlayerSearchButton');
            $searchBtn.button({ icons: { primary: "ui-icon-search" }, text: false });

        } else {

            // cache the button selectors
            var btn = {
                $play: $("#playButton"),
                $pause: $("#pauseButton"),
                $prev: $("#skipBackButton"),
                $next: $("#skipForwardButton")
            };

            // style the buttons
            btn.$play.button({ icons: { primary: "ui-icon-play" }, text: false });
            btn.$pause.button({ icons: { primary: "ui-icon-pause" }, text: false });
            btn.$prev.button({ icons: { primary: "ui-icon-seek-first" }, text: false });
            btn.$next.button({ icons: { primary: "ui-icon-seek-end" }, text: false });

            if (!this.model.trackLoaded) {

                // disable the controls
                btn.$play.button("option", "disabled", true);
                btn.$pause.button("option", "disabled", true);
                btn.$prev.button("option", "disabled", true);
                btn.$next.button("option", "disabled", true);
                $("#trackPosition").slider({ disabled: true });
                $("#spinner").progressbar({ value: false });

            } else {

                // initialise song position slider
                $("#trackPosition").slider({
                    min: 0,
                    max: _buffer.duration,
                    value: _position,
                    step: 0.01,
                    range: 'min',
                    start: _onSliderStart,
                    stop: _onSliderStop
                });
                //$("#spinnerContainer").hide();
                _setSkipButtonStates();
            }
        }

        return this;
    }
});
