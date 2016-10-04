/**
 * Created by xoundboy on 25/03/16.
 */
var _ = require('underscore');
var $ = require('jquery');
var notification = require('../helpers/notification.js');
var GalleryModel = require('../models/gallery.js');
var GalleryImagesCollection = require('../collections/galleryImages.js');
var GalleryImagesView = require('./galleryImages.js');
var ImageModel = require('../models/image.js');
var template = require('./html/gallery.html');
var ajax = require('../core/ajax.js');

/**
 * To associate and integrate a gallery with an "Other Entity" (OE)
 * for example, artist, track, playlist etc do the following:
 *
 *  1. create an empty gallery and get its id
 *
 *  2. assign this galleryID to the OE model
 *
 *  3. When initializing the OE view,
 *
 *          this.galleryView = utils.createGalleryView(galleryID, containerElSelector)
 *
 *  4. After the OE view HTML has been rendered into the DOM,
 *
 *          this.galleryView && this.galleryView.render();
 */


module.exports = Backbone.View.extend({

    id: "gallery",

    initialize: function (options) {

        this.containerElSelector = options.containerElSelector;
        this.initializeForm();

        this.model = new GalleryModel({
            id: options.galleryID,
            images: new GalleryImagesCollection()
        });

        // sub-view
        this.galleryImagesView = new GalleryImagesView({
            collection: this.model.get("images")
        });

        this.model.fetch({success: $.proxy(this.onGalleryModelFetched, this)});
    },

    initializeForm: function() {
        this.formData = new FormData();
    },

    onGalleryModelFetched: function(model, response){

        // Populate the gallery images collection with the JSON
        // string from the galleries.image field in the db.
        this.model.get("images").reset(response);
    },

    events: {
        "change #artistImageUpload": "uploadImage",
        "click #deleteSelectedImages": "deleteSelected",
        "click .galleryImage": "selectImage"
    },

    selectImage: function(e){
        $(e.target).toggleClass("selected");
        this.showHideDeleteButton();
    },

    showHideDeleteButton: function(){
        var deleteButton = this.$el.find("#deleteSelectedImages");
        if ($(".galleryImage.selected").length) {
            deleteButton.show();
        } else {
            deleteButton.hide();
        }
    },

    deleteSelected: function(){

        var deleteList = [],
            images = this.model.get("images");

        this.$el.find(".galleryImage.selected").each(function(i,el){
            var index = $(el).index();
            deleteList.push(images.at(index));
        });
        _.each(deleteList, function(item){
            images.remove(item);
        });
        this.model.save();
        this.renderGalleryImages();
        this.showHideDeleteButton();
    },

    uploadImage: function(e){

        var file = e.target.files[0];

        if (file){
            this.showLoadingMessage();
            this.setFormData(file);

            ajax.request({
                method: 'POST',
                url: "/api/image/upload",
                success: $.proxy(this.onUploadImageSuccess, this),
                error: $.proxy(this.onUploadImageError, this),
                data: this.formData
            });
        }
    },

    onUploadImageSuccess: function (data) {
        var response = (JSON.parse(data.currentTarget.responseText));
        var newImage = new ImageModel({
            src: response.finalImageFileName,
            size: response.size
        });
        this.model.get("images").add(newImage);
        this.model.save();
        this.initializeForm();
        this.loadingMessage.close();
    },

    onUploadImageError: function (data){
        alert("error uploading the file");
        console.log(data);
    },

    showLoadingMessage: function(){
        this.loadingMessage = notification.create({
            message: "Uploading file to server, please wait..."
        });
    },

    setFormData: function(uploadFile){
        this.formData.append('uploadFile', uploadFile);
        this.formData.append('actName', this.model.get("actName"));
        this.formData.append('playlistName', this.model.get("playlistName"));
        this.formData.append('trackName', this.model.get("trackName"));
    },

    render: function() {
        var that = this;
        this.$el.html(template(this.model.attributes));
        this.renderGalleryImages();

        // gallery renders itself into its assigned container Element
        $(this.containerElSelector).html(this.$el);

        // upload button click cannot be triggered using a remote button
        // using backbone events
        this.$el.find("#uploadImageFacade").click(function(){
            that.$el.find("#artistImageUpload").click();
        });

        this.$el.find("#deleteSelectedImages").hide();

        // sub-views need this
        this.delegateEvents();
        return this;
    },

    renderGalleryImages: function(){
        this.$el.find("#imagesContainer").html(this.galleryImagesView.render().el);
    }
});