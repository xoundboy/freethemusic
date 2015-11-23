var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    open: function(){

    },

    close: function(){
        $("#notificationContainer").empty().removeData().unbind().hide();
        this.undelegateEvents();
        this.remove();
        Backbone.View.prototype.remove.call(this);
    },

    render: function(){
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        $("#notificationContainer").html(compiledTemplate).show();
        return this;
    }
});