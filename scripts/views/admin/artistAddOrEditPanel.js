require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var ArtistModel = require('../../models/artist.js');
var viewUtils = require('../../helpers/viewUtils.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistEditPanel",
    className: "addOrEditPanel",
    containerElSelector: "#mainContent",

    initialize: function(options) {

        _.extend(this, _.pick(options, "returnUrl"));
        this.template = $('#template_artistAddOrEditPanel').html();

        // new artist
        if (options.id){
            this.model = adminApp.collections.artists.get(options.id);
            this.createGallery();

        // existing artist
        } else {
            this.model = new ArtistModel();
            this.createEmptyDbRecords();
        }
    },

    createGallery: function(){
        var galleryID = this.model.get("galleryID");
        this.galleryView = viewUtils.createGalleryView(galleryID, "#artistGalleryContainer");
    },

    events: {
        "click #cancelEditButton": "closePanel",
        "click #addOrUpdateArtist": "addOrUpdateArtist"
    },

    createEmptyDbRecords: function(){
        this.loadingMessage = viewUtils.createNotification({
            message: "Initialising artist, please wait..."
        });
        this.model.save(null, {
            success: $.proxy(this.onIdsCreated, this),
            wait:true
        });
    },

    onIdsCreated: function(){
        this.loadingMessage.close();
        this.createGallery();
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

        // first render self into #mainContent
        $(this.containerElSelector).html(this.$el);

        // now render the gallery section if its available
        this.galleryView && this.galleryView.render();

        this.$el.find("button").button();
        return this;
    }

});