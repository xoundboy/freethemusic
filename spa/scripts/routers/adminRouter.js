var $ = require('jquery');
var Backbone = require('backbone');

var dashboardModel = require('../models/dashboard.js');
var DashboardView = require('../views/admin/dashboard.js');
var dashboardView = new DashboardView({ model: dashboardModel, template: $("#template_dashboard").html() });

module.exports = new (Backbone.Router.extend({

    routes: {
        '': 'showDashboard'
    },

    showDashboard: function () {
        dashboardView.render();
    }

}))();
