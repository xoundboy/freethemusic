var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    el: "#notificationContainer",

    initialize: function(options){
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', this.render);
        this.render();

        if (this.model.get("autohide")){
            setTimeout(this.close, this.model.get("duration"));
        }
    },

    close: function(){
        $("#notificationContainer").empty().removeData().unbind().hide();
        Backbone.View.prototype.remove.call(this);
    },

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate).show();
        return this;
    }
});