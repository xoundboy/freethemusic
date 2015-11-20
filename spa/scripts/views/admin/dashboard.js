//require('jquery-ui/tabs');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    el: "#page",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
    },

    scrollToElement: function($element){

        var offset = $element.offset();

        if(offset){
            console.log(offset);
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            });
        }
    },

    switchMainContent: function(tabName){
        var tabHtml = adminApp.views[tabName].render().el;
        this.$el.find("#mainContent").html(tabHtml);
    },

    render: function () {
        console.log("rendering dashboard");
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        return this;
    }
});