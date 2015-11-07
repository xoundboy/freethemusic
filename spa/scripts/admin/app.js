var AdminApp = function () {

    var init = function (adminApp) {

        this.Router = new adminApp.Router(adminApp);

        // This triggers the first route
        Backbone.history.start();
    };

    return { init: init };
}