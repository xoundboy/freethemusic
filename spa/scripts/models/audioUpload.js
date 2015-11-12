var ArtistsCollection = require('../collections/artists.js');
var TypesCollection = require('../collections/types.js');

module.exports = Backbone.Model.extend({

    defaults: {
        size: 0,
        stepCount: 4,
        tempFile: null
    },

    initialize: function() {
        this.set("artistOptions", new ArtistsCollection().toJSON());
        this.set("typeOptions", new TypesCollection().toJSON());
    },

    setStep: function (step) {

        var i, 
            result, 
            updateObj = {},
            stepCount = this.get("stepCount");

        updateObj.currentStep = step;

        for (i = 1; i <= stepCount; i++) {
            result = i === step;
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
    }
});