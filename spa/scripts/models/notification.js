var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    defaults: {
        type: 'info', // possible values 'info', 'warning', 'error'
        message: "no message yet",

        autohide: false,
        duration: 4000, // length of time in ms before auto hide kicks in

        showOkButton: true,
        showCancelButton: false,

        okCallback: function(){},
        cancelCallback: function(){}
    }
});