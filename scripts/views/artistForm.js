require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var ArtistModel = require('../models/artist.js');
var notification = require('../helpers/notification.js');
var GalleryView = require('./gallery.js');
var template = require("./html/artistForm.html");

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistEditPanel",
    className: "addOrEditPanel",

    events: {
        "click #cancelEditButton": "closePanel",
        "submit #artistInfo": "addOrUpdateArtist"
    },

    initialize: function(options) {
        _.extend(this, _.pick(options, "returnUrl"));
        _.extend(this, _.pick(options, "newArtist"));
        this.listenTo(this.model, "change", this.render);
        if (!this.newArtist){
            this.model.fetch();
        } else {
            this.render();
        }
    },

    closePanel: function() {
        this.remove();
        X7.router.navigate('artists/highlight/' + this.model.id, {trigger: true});
    },

    reopenPanelWithGallery: function() {
        this.remove();
        X7.router.navigate('artist/edit/' + this.model.id, {trigger: true});
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

    onArtistSaveSuccess: function(data){
        this.newArtistId = data.id;
        X7.collections.artists.fetch({
            reset: true,
            success: $.proxy(this.onArtistsFetchSuccess, this)
        });
    },

    onArtistsFetchSuccess: function(){
        if (this.returnUrl){
            X7.router.navigate(this.returnUrl + '?actId='+ this.newArtistId, {trigger:true});
            return;
        }
        if (this.newArtist){
            this.reopenPanelWithGallery();
        } else {
            this.closePanel();
        }
    },

    render: function () {
        this.$el.html(template(this.model.attributes));
        this.$el.find("button").button();
        this.renderGallery();

        // Sub-views need this or events associated with
        // previous renderings of the view will be lost.
        this.delegateEvents();

        return this;
    },

    renderGallery: function(){
        var galleryID = this.model.get("galleryID");
        if (galleryID){
            var galleryView = new GalleryView({id: galleryID});
            this.$el.find("#artistGalleryContainer").html(galleryView.render().el);
        }
    }
});
