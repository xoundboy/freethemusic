

// models
x7.models = {
    dashboard: new x7.DashboardModel(),
    audioUpload: new x7.AudioUploadModel()
};


// Kick off the application when the DOM is loaded.
$(document).ready(function () {

    x7.templates = {
        dashboard: $("#template_dashboard").html(),
        audioUpload: $("#template_audioUpload").html(),
        recordings: $("#template_recordings").html(),
        recordingAddEdit: $("#template_recordingAddEdit").html(),
        recordingEditPanel: $("#template_recordingEditPanel").html()
    };

    x7.views = {
        dashboard: new x7.DashboardView({ model: x7.models.dashboard, template: x7.templates.dashboard }),
        audioUpload: new x7.AudioUploadView({ model: x7.models.audioUpload, template: x7.templates.audioUpload }),
        recordings: new x7.RecordingsView({ collection: x7.collections.recordings, template: x7.templates.recordings})
    };

    var adminApp = new AdminApp();
    adminApp.init(x7);
});