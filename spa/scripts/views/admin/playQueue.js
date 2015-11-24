var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    el: "#playQueueContainer",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'update', this.render);
    },

    events: {
        "click .removeTrackFromQueueButton": "remove"
    },

    remove: function(e){
        var id = $(e.currentTarget).attr("data-recid");
        this.collection.remove(id);
    },

    styleButtons: function() {
        this.$el.find(".removeTrackFromQueueButton").button({
            text: false,
            icons: {
                primary: "ui-icon-close"
            }
        });
    },

    render: function() {
        var compiledTemplate = Mustache.to_html(this.template, { recordings: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        this.styleButtons();
        return this;
    }

});