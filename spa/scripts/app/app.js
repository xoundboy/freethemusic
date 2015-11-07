var App = function () {

    var init = function (app) {

        this.Router = new app.Router(app);

        // This triggers the first route
        Backbone.history.start();
    };

    return { init: init };
}