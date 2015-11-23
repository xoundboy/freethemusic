
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    el: "#page",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
    },

    events: {
        "click .goBack": "goBack",
        "click .goForward": "goForward"
    },

    goBack: function(){
        Backbone.history.history.back();
    },

    goForward: function(){
        Backbone.history.history.forward();
    },

    highlightElement: function($element){

        if ($element.length){

            // highlight the colour
            $element.addClass("highlighted");

            // scroll into view
            var offset = $element.offset();
            if(offset){
                $('html, body').animate({
                    scrollTop: offset.top,
                    scrollLeft: offset.left
                }, "slow");

                setTimeout(function(){
                    // unhighlight after a couple of secs
                    $element.removeClass("highlighted")
                },2000)
            }
        }
    },


    styleButtons: function(){
        this.$el.find(".goForward").button({
            text: false,
            icons: {
                primary: "ui-icon-arrowthick-1-e"
            }
        });
        this.$el.find(".goBack").button({
            text: false,
            icons: {
                primary: "ui-icon-arrowthick-1-w"
            }
        });
    },

    loadTabHtml: function(html){
        this.$el.find("#mainContent").html(html);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, {});
        this.$el.html(compiledTemplate);
        this.styleButtons();
        return this;
    }
});