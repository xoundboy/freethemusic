console.log('App loaded again');

require('./css/reset.scss');
require('./css/app/base.scss');
require('./css/app/menu.scss');
require('./css/app/player.scss');
require('./css/app/style.scss');

require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.min.css');
require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css');
require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css');

var $ = require('jquery');
var Backbone = require('backbone');
var Mustache = require('mustache');
var Serialize = require('jquery-serializejson');
var Validate = require('jquery-validation');


//TODO - maybe I still need these dependencies - not sure - leaving them out for now
//    "~/node_modules/backgrid/lib/backgrid.js",
//    "~/node_modules/backbone-deep-model/distribution/deep-model.js"


$(function(){
    require('./scripts/app/router');
    Backbone.history.start();
});