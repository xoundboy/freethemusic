var config = require('../config.js');

module.exports = {

    requestWithToken: function(options){

        if (!options)
            throw new Error("missing options object");
        if (!options.method)
            throw new Error("missing XMLHttpRequest METHOD");
        if (!options.url)
            throw new Error("missing XMLHttpRequest url");

        var xhr_upload = new XMLHttpRequest();

        if (options.url && options.method)
            xhr_upload.open(options.method, options.url, true);

        if (options.success)
            xhr_upload.onload = options.success;

        if (options.error)
            xhr_upload.onerror = options.error;

        var payload = options.data ? options.data : null;

        var token = window.localStorage.getItem(config.LS_ACCESS_TOKEN);

        if (token)
            xhr_upload.setRequestHeader('Authorization', token);

        xhr_upload.onreadystatuschange = this.handleErrors;

        xhr_upload.send(payload);
    },

    handleErrors: function(a,b,c,d){
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
    }
};