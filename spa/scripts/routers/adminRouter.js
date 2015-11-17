var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'showDashboard',
        'recordings/highlight/:id': 'highlightRecording'
    },

    showDashboard: function () {
        adminApp.views.dashboard.render();
    },

    highlightRecording: function(id){
        adminApp.views.recordings.select(id);
        adminApp.models.dashboard.set("currentTabHref", "#recordings");
    }

});
