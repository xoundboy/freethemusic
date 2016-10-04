var config = require('../config.js');


module.exports = {

    request: function(options){

        var xhr_upload = new XMLHttpRequest();

        xhr_upload.open('POST', "/api/image/upload", true);

        if (options.success)
            xhr_upload.onload = options.success;

        if (options.error)
            xhr_upload.onerror = options.error;

        var payload = options.data ? options.data : null;

        var token = window.localStorage.getItem(config.LS_ACCESS_TOKEN);
        if (token)
            xhr_upload.setRequestHeader('Authorization', token);

        xhr_upload.send(payload);
    }
};