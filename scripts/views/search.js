var button = require('../helpers/button.js');
var template = require('./html/search.html');
require('jquery-validation');
require('jquery-serializejson');
var $ = require('jquery');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "searchContent",
    data: null,

    initialize: function () {
        this.listenTo(this.model, "change", this.render);
    },

    events: {
        "submit form": "onSubmit"
    },

    onSubmit: function(e){
        e.preventDefault();
        this.$form = this.$el.find("#searchForm");
        this.model.set("q", this.$form.find("#q").val());

        if (this.$form.validate().form()){
            this.sendSearchRequest();
        }
        return false;
    },

    sendSearchRequest: function(){
        $.ajax({
            url: "api/search",
            success: $.proxy(this.onSearchSuccess,this),
            error: $.proxy(this.onSearchFail,this),
            method: "GET",
            data: this.$form.serializeJSON()
        });
    },

    onSearchSuccess: function(data){
        this.model.set("results", data);
        this.model.setResultsCount();
        this.model.set("error", false);
    },

    onSearchFail: function(){
        this.model.set("error", true);
    },

    styleButtons: function() {
        button.style(this.$el.find("#searchButton"),"ui-icon-search");
    },

    render: function () {
        this.$el.html(template(this.model.attributes));
        this.styleButtons();

        this.delegateEvents();

        return this;
    }
});
