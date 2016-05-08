var $ = require('jquery');
var DashboardModel = require('../models/nav.js');
var DashboardView = require('../views/nav.js');

var admin = {};

// The nav view and model should only be instantiated once, so to avoid
// having to assign it to a global, putting it into this module.
// When Node 'require's a module, it first checks to see if the
// module already exists and returns the cached object if possible.

admin.dashboardModel = new DashboardModel();

admin.dashboardView = new DashboardView({
    model: admin.dashboardModel,
    template: $("#template_dashboard").html()
});


module.exports = admin;