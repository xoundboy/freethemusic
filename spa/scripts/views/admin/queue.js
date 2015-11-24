var _ = require('underscore');
var $ = jQuery = require('jquery');
var Mustache = require('mustache');
require('jquery-ui/sortable');
require('jquery-ui-touch-punch');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "queueContainer",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.collection, 'update', this.render);
        this.collection.fetch();
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

    sortablize: function(){

        var that = this;

        this.$el.find("tbody").sortable({
            axis: "y",
            placeholder: "ui-state-highlight",
            stop: function(e, ui){
                var id = $(ui.item).attr("data-id");
                var newIndex = ui.item.index();
                that.collection.reorder(id, newIndex);
            }
        });
        this.$el.find("tbody").disableSelection();
    },

    render: function() {

        var compiledTemplate = Mustache.to_html(this.template, { queue: this.collection.toJSON()});
        this.$el.html(compiledTemplate);
        this.styleButtons();
        this.sortablize();


        this.delegateEvents();

        return this;
    }

});