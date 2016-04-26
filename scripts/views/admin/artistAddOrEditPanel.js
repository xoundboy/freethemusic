require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var ArtistModel = require('../../models/artist.js');
var notification = require('../../helpers/notification.js');
var GalleryView = require('./gallery.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistEditPanel",
    className: "addOrEditPanel",
    containerElSelector: "#mainContent",
    newArtist: true,

    events: {
        "click #cancelEditButton": "closePanel",
        "submit #artistInfo": "addOrUpdateArtist"
    },

    initialize: function(options) {

        _.extend(this, _.pick(options, "returnUrl"));
        this.template = $('#template_artistAddOrEditPanel').html();

        if (options.id){

            // existing artist
            this.newArtist = false;
            this.model = adminApp.collections.artists.get(options.id);
            this.setGalleryView(this.model.get("galleryID"));

        } else {

            //  new artist
            this.model = new ArtistModel();
        }
    },

    setGalleryView: function(galleryID){
        this.galleryView = new GalleryView({
            galleryID: galleryID,
            containerElSelector: "#artistGalleryContainer"
        });
    },

    closePanel: function() {
        this.remove();
        adminApp.routers.main.navigate('artists/highlight/' + this.model.id, {trigger: true});
    },

    reopenPanelWithGallery: function() {
        this.remove();
        adminApp.routers.main.navigate('artist/edit/' + this.model.id, {trigger: true});
    },

    addOrUpdateArtist: function(e) {

        e.preventDefault();

        var $infoForm = this.$el.find("#artistInfo"),
            validator = $infoForm.validate();

        if (validator.form()) {
            this.model.set($infoForm.serializeJSON());
            this.model.save(null, {
                success: $.proxy(this.onArtistSaveSuccess, this)
            });
        }
        return false;
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
        if (this.newArtist){
            this.reopenPanelWithGallery();
        } else {
            this.closePanel();
        }
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        // first render self into #mainContent
        $(this.containerElSelector).html(this.$el);

        // now render the gallery section if its available
        this.galleryView && this.galleryView.render();

        this.$el.find("button").button();

        // Sub-views need this or events associated with
        // previous renderings of the view will be lost.
        this.delegateEvents();

        return this;
    }
});