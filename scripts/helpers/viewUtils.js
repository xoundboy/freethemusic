var $ = require('jquery');
var NotificationModel = require('../models/notification.js');
var NotificationView = require('../views/admin/notification.js');
var GalleryView = require('../views/admin/gallery.js');


module.exports = {

    createNotification: function(options){
        return new NotificationView({
            model: new NotificationModel(options),
            template: $("#template_notification").html()
        });
    },

    createGalleryView: function(galleryID, containerElSelector){
        return new GalleryView({
            galleryID: galleryID,
            containerElSelector: containerElSelector
        });
    },

    styleButton: function($el, icon, showText, disabled){
        showText = !!showText;
        disabled = !!disabled;
        $el.button({
            text: showText,
            disabled: disabled,
            icons: {
                primary: icon
            }
        });
    }

};