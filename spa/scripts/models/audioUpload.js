x7.AudioUploadModel = Backbone.Model.extend({

    defaults: {
        size: 0,
        stepCount: 4,
        tempFile: null
    },

    initialize: function() {
        this.set("artistOptions", x7.collections.artists.toJSON());
        this.set("typeOptions", x7.collections.types.toJSON());
    },

    setStep: function (step) {

        var i, 
            result, 
            updateObj = {},
            stepCount = this.get("stepCount");

        updateObj.currentStep = step;

        for (i = 1; i <= stepCount; i++) {
            if (i === step) {
                result = true;
            } else {
                result = false;
            };
            updateObj["step" + i] = result;
        }

        this.set(updateObj);
    },

    stepBack: function () {
        var cs = this.get("currentStep");
        if (cs > 1) {
            this.setStep(cs - 1);
        }
    },

    stepForward: function () {
        var cs = this.get("currentStep"),
            sc = this.get("stepCount");
        if (cs < sc) {
            this.setStep(cs + 1);
        }
    },
});