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

    },

    events: {
        "submit form": "onSubmit"
    },

    onSubmit: function(e){
        e.preventDefault();
        this.$form = this.$el.find("#searchForm");

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

    onSearchSuccess: function(result){
        this.data = result;
        this.render();
    },

    onSearchFail: function(data){Exist
        console.log(data);
    },

    enrichData: function(){
        if (!this.data)
            return null;

        var d = this.data;
        d.resultCount =  d.recordings.length + d.artists.length + d.playlists.length;
        d.recordingsExist = !!(d.recordings.length);
        d.artistsExist = !!(d.artists.length);
        d.playlistsExist = !!(d.playlists.length);
    },

    styleButtons: function() {
    },

    render: function () {
        this.enrichData();
        var viewModel = {
            data: this.data
        };
        this.$el.html(template(viewModel));
        this.styleButtons();

        this.delegateEvents();

        return this;
    }

});