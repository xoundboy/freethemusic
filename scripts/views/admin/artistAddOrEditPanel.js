require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

var utils = require('../../utils.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistEditPanel",
    className: "addOrEditPanel",

    initialize: function(options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    events: {
        "click #cancelEditButton": "closePanel",
        "click #addOrUpdateArtist": "addOrUpdateArtist"
    },

    closePanel: function() {
        adminApp.routers.main.navigate('artists/highlight/' + this.model.id, {trigger: true});
    },

    addOrUpdateArtist: function (e) {

        e.preventDefault();

        var that = this,
            $infoForm = this.$el.find("#artistInfo"),
            validator = $infoForm.validate();

        if (validator.form()) {
            this.model
                .set($infoForm.serializeJSON())
                .save(null, {
                    success: function() {
                        adminApp.collections.artists.fetch({
                            reset: true,
                            success: function(){
                                that.closePanel();
                            }
                        });
                    }
                });
        }
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);
        this.$el.find("button").button();
        return this;
    }

});