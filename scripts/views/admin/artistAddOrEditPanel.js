require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var ArtistModel = require('../../models/artist.js');
var notification = require('../../helpers/notification.js');
var gallery = require('../../helpers/gallery.js');
var GalleryModel = require('../../models/gallery.js');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistEditPanel",
    className: "addOrEditPanel",
    containerElSelector: "#mainContent",

    events: {
        "click #cancelEditButton": "closePanel",
        "click #addOrUpdateArtist": "addOrUpdateArtist"
    },

    initialize: function(options) {

        var that = this;

        _.extend(this, _.pick(options, "returnUrl"));
        this.template = $('#template_artistAddOrEditPanel').html();

        // existing artist
        if (options.id){
            this.model = adminApp.collections.artists.get(options.id);
            var galleryID = this.model.get("galleryID");
            if (!galleryID){
                var newGallery = new GalleryModel();
                newGallery.save(null, {
                    success: function(data){
                        that.model.set("galleryID", data.id);
                        that.model.save(null, {
                            success: function(){
                                that.galleryView = gallery.createView(data.id, "#artistGalleryContainer");
                                that.render();
                            }
                        });
                    }
                });
            }
        //  new artist
        } else {
            this.model = new ArtistModel();
            this.model.save(null, {
                success: $.proxy(this.onIdsCreated, this),
                wait:true
            });
        }
    },

    onIdsCreated: function(){
        this.loadingMessage.close();
        this.initGallery();
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