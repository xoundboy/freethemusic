require('jquery-validation');
require('jquery-serializejson');

var GalleryModel = require('../../models/gallery.js');
var GalleryView = require('./gallery.js');

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
        _.extend(this, _.pick(options, "returnUrl"));

        // new artist
        if (this.model.id === undefined){
            this.createEmptyDbRecords();
        }
    },

    events: {
        "click #cancelEditButton": "closePanel",
        "click #addOrUpdateArtist": "addOrUpdateArtist"
    },

    createEmptyDbRecords: function(){
        this.loadingMessage = utils.createNotification({
            message: "Initialising artist, please wait..."
        });
        this.model.save(null, {
            success: $.proxy(this.onIdsCreated, this),
            wait:true
        });
    },

    onIdsCreated: function(){
        this.loadingMessage.close();
        this.render();
    },

    closePanel: function() {
        adminApp.routers.main.navigate('artists/highlight/' + this.model.id, {trigger: true});
    },

    addOrUpdateArtist: function (e) {

        e.preventDefault();

        var $infoForm = this.$el.find("#artistInfo"),
            validator = $infoForm.validate();

        if (validator.form()) {
            this.model.set($infoForm.serializeJSON());
            this.model.save(null, {
                success: $.proxy(this.onArtistSaveSuccess, this)
            });
        }
    },

    onArtistSaveSuccess: function(){
        adminApp.collections.artists.fetch({
            reset: true,
            success: $.proxy(this.onArtistsFetchSuccess, this)
        });
    },

    onArtistsFetchSuccess: function(data){
        if (this.returnUrl){
            adminApp.routers.main.navigate(this.returnUrl + '?actId='+ data.id, {trigger:true});
            return;
        }
        this.closePanel();
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        this.renderGallerySection();

        this.$el.find("button").button();
        return this;
    },

    renderGallerySection: function() {

        var galleryModel = new GalleryModel({
            galleryID: this.model.get("galleryID"),
            actName: this.$el.find("#actName").val()
        });

        var gallerySection = new GalleryView({
            model: galleryModel,
            template: $("#template_gallery").html()
        });
        this.$el.find("#artistGalleryContainer").html(gallerySection.render().el);
    }
});