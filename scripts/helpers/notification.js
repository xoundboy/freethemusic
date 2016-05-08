/**
 * Created by xoundboy on 27/03/16.
 */
var NotificationModel = require('../models/notification.js');
var NotificationView = require('../views/notification.js');

module.exports = {
    create: function(options){
        return new NotificationView({
            model: new NotificationModel(options)
        });
    }
};