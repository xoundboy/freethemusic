/**
 * Created by xoundboy on 05/03/16.
 */

module.exports = function(){

    this.elem = null;
    this.model = null;

    this.id = "playerAudioElement";
    this.src = null;
    this.type = "audio/mpeg";
    this.controls = false;
    this.preload = "auto"; // possible: 'auto', 'metadata', 'none'

    this.init = function(){
        this.elem = document.createElement("AUDIO");
        this.elem.setAttribute("id", this.id);
        this.elem.setAttribute("type", this.type);
        this.elem.setAttribute("preload", this.preload);
        if (this.controls) this.elem.setAttribute("controls", true);
        document.body.appendChild(this.elem);
    };

    this.load = function(model, currentTime){
        this.model = model;
        this.elem.currentTime = parseFloat(currentTime);
        this.elem.addEventListener("canplay", this.onLoaded);
        this.src = "assets/audio/" + model.get("audioFile") + ".mp3";
        this.elem.setAttribute("src", this.src);
    };

    this.play = function(currentTime, onEndedCallback){
        this.elem.currentTime = parseFloat(currentTime);
        this.elem.addEventListener("ended", onEndedCallback);
        this.elem.play();
    };

    this.pause = function(){
        this.elem.pause();
    };

    this.onLoaded = function(e){
        this.elem.removeEventListener("canplay", this.onLoaded);
        this.duration = e.target.duration;
        X7.views.player.render();
    }.bind(this);
};
