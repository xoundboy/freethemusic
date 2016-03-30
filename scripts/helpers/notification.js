/**
 * Created by xoundboy on 27/03/16.
 */
var $ = require('jquery');
var NotificationModel = require('../models/notification.js');
var NotificationView = require('../views/admin/notification.js');

module.exports = {
    create: function(options){
        return new NotificationView({
            model: new NotificationModel(options),
            template: $("#template_notification").html()
        });
    }
};