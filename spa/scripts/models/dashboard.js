module.exports = Backbone.Model.extend({

    // dashboard only has one property - the name of the currently selected tab
    defaults: {
        currentTab: null
    }

});