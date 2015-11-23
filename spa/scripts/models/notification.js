module.exports = Backbone.Model.extend({

    defaults: {
        type: 'info', // possible values 'info', 'warning', 'error'
        message: "no message yet",
        autohide: false,
        showOkButton: true,
        showCancelButton: false,
        okCallback: function(){},
        cancelCallback: function(){}
    }
});