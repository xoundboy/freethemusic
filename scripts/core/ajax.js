var config = require('../config.js');


module.exports = {

    request: function(options){

        var xhr_upload = new XMLHttpRequest();

        if (options.url && options.method)
            xhr_upload.open(options.method, options.url, true);

        if (options.success)
            xhr_upload.onload = options.success;

        if (options.error)
            xhr_upload.onerror = options.error;

        var payload = options.data ? options.data : null;

        var token = window.localStorage.getItem(config.LS_ACCESS_TOKEN);

        if (token && !options.disableAuthHeader)
            xhr_upload.setRequestHeader('Authorization', token);

        xhr_upload.send(payload);
    }
};