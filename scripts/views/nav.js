var $ = require('jquery');
var Backbone = require('backbone');
var template = require('./html/navigation.html');

module.exports = Backbone.View.extend({

    el: "#navContainer",

    events: {
        "click .goBack": "goBack",
        "click .goForward": "goForward",
        "click a": "selectItem"
    },

    selectItem: function(e){
        this.$el.find("a").removeClass("selected");
        $(e.target).addClass("selected");
    },

    selectItemById: function(id){
        this.$el.find("a").removeClass("selected");
        this.$el.find("a#" + id).addClass("selected");
    },

    goBack: function(){
        Backbone.history.history.back();
    },

    goForward: function(){
        Backbone.history.history.forward();
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

    render: function () {
        this.$el.html(template());
        this.styleButtons();
        return this;
    }
});