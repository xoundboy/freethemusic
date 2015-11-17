var $ = require('jquery');

module.exports = Backbone.Model.extend({
    defaults: {
        //currentTabHref: "#recordings"
    },

    getCurrentTabIndex: function() {
        return $('#tabs').find('a[href="' + this.get("currentTabHref") + '"]').parent().index();
    }

});