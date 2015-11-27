var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "queuePlayer",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    render: function(){

        var that = this;
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        // sub-views need this
        this.delegateEvents();

        this.$el.find("audio").bind('ended', function(){
            console.log("playback ended");
            that.model.loadNextTrackFromQueue();
        });

        return this;
    }
});
