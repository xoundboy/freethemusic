//require('./css/reset.scss');
//require('./css/admin/base.scss');//
//require('./css/admin/style.scss');
//
//require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.min.css');
//require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css');
//require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css');

var $ = require('jquery');
var Backbone = require('backbone');

// Bootstrap the application when the DOM is ready
$(function(){
    require('./routers/adminRouter.js');
    Backbone.history.start();
});