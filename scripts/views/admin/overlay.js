var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');
var viewUtils = require('../../helpers/viewUtils.js');

module.exports = Backbone.View.extend({

    el: "#overlayContainer",

    initialize: function(options){
        _.extend(this, _.pick(options, "template"));
        _.extend(this, _.pick(options, "contentView"));
        _.extend(this, _.pick(options, "onClose"));
        this.listenTo(this.model, 'change', this.render);

        this.render();
    },

    events: {
      "click .closeButton": "close"
    },

    close: function(){
        if (this.onClose) {
            this.onClose.call(this);
        }
        this.$el.empty().removeData().unbind().hide();
        //Backbone.View.prototype.remove.call(this);
    },

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate).show();
        viewUtils.styleButton(this.$el.find(".closeButton"), "ui-icon-closethick");

        // render content into the overlay
        this.$el.find("#overlayContent").html(this.contentView.render().el);

        return this;
    }
});
