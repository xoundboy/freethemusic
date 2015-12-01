x7.OldPlayerModel = Backbone.Model.extend({

    audioCtx               : null,
    track                  : null,
    playlist               : null,
    buffer                 : null,
    source                 : null,
    updateInterval         : 50,
    lastStartTime          : null,
    updatePositionInterval : null,
    tracklistIndex         : null,
    position               : 0,
    isPlaying              : false,
    resumeAfterSliding     : false,
    playWhenLoaded         : false,
    firstTrackLoaded       : false,

    triggerPlayEvent : function(index, position){
        $.event.trigger({
            type:"play",
            message: {
                track: this.playlist.getTrackList()[index],
                index: index,
                position: position
            }
        });
    },

    triggerPauseEvent : function() {
        $.event.trigger({
            type:"pause"
        });
    },

    setHandlers : function() {

        $(document)

            // listen for PLAY events. the message should be an object
            // with the following structure
            // {
            //    track:    (object)  track to play,
            //    position: (numeric) position within track to start playing at,
            //    index:    (Int)     index of track with in tracklist
            // }
            .on("play", play)

            // listen for PAUSE events
            .on("pause", pause);

        $("#playlistTransportContainer")

            // click PLAY button
            .on("click", '#playButton', function(){
                triggerPlayEvent(tracklistIndex, null);
                // TODO move this into play event handler
                playlist.updateTrackPlayingStatus(tracklistIndex);
            })

            // click PAUSE button
            .on("click", '#pauseButton', function(){
                triggerPauseEvent();
                // TODO move this into pause event handler
                playlist.updateTrackPlayingStatus(-1);
            })

            // click SKIP FORWARD button
            .on("click", "#skipForwardButton", function(){
                setTimeout(function(){
                    skipForward();
                }, 10);
            })

            // click SKIP BACK button
            .on("click", "#skipBackButton", function(){
                setTimeout(function(){
                    skipBack(isPlaying);
                }, 10);
            })
    },

    play : function(e) {

        if (e.message.track){
            track = e.message.track;
        }
        if (e.message.index !== null){
            tracklistIndex = e.message.index;
        }
        if (e.message.position !== null){
            setPosition(e.message.position);
        }

        // Temporarily disable all buttons while song loads
        // This eliminates the problem of two or more tracks being
        // loaded and played simultaneously if user clicks a play
        // button of another track while the first track is still loading
        // TODO implement interrupt queues to improve UI responsiveness
        playlist.disableButtons(true);
        render(false);

        // always trigger pause before playing any track
        triggerPauseEvent();

        setTimeout(function(){

            // already in the process of loading the buffer for this track
            if (track.getLoadingStatus()){
                playWhenLoaded = true;
            }

            if (!track.bufferLoaded()){
                track.loadBuffer(playTheBuffer);
            } else {
                playTheBuffer(track.getBuffer());
            }
        }, 10);

        // experiment with audio tag stream
        //track.audioTag();

    },

    playTheBuffer : function(buffer){

        var lastStartPosition;

        // cache the buffer
        buffer = buffer;

        // create a new source
        source = audioCtx.createBufferSource();
        source.connect(audioCtx.destination);

        // remember the start time and position
        lastStartTime = audioCtx.currentTime;
        lastStartPosition = position;

        // pass the buffer to the source
        source.buffer = buffer;

        // instruct on what to do when track ends
        source.onended = onTrackEnd;

        // periodically update the playback position
        updatePositionInterval = setInterval(function(){

            // unfortunately the buffer doesn't return a reference to its position
            // so have to keep track of this manually.
            setPosition((audioCtx.currentTime - lastStartTime) + lastStartPosition);
        }, updateInterval);

        // re-enable playlist small buttons
        playlist.disableButtons(false);

        // set the buttons to the correct states
        playlist.updateTrackPlayingStatus(tracklistIndex);
        // TODO this should be automatically done by the render fn
        setSkipButtonStates();

        // preload the next track
        if (tracklistIndex < (playlist.getTrackList().length -1)){
            preLoadTrack(tracklistIndex + 1);
        }

        // update the UI with new play status
        setIsPlayingStatus(true);

        // and finally...start playing the track
        source.start(0, position);
    },

    onNewTrackPreloaded : function(buffer, index){

        firstTrackLoaded = true;

        playlist.setTrackLoaded(index);

        if(!isPlaying){
            buffer = buffer;
            render(true);
        }

        if (playWhenLoaded){
            playTheBuffer(buffer);
            playWhenLoaded = false;
        }
    },

    preLoadTrack : function(index){
        var newTrack = playlist.getTrackList()[index];
        newTrack.loadBuffer(onNewTrackPreloaded, index);
    },

    onTrackEnd : function() {
        setIsPlayingStatus(false);
        stopPositionUpdating();

        if (endedNaturally()){
            skipForward(true);
        }
        $.event.trigger({
            type: "trackEnded",
            message: {
                trackIndex: tracklistIndex
            }
        })
    },

    endedNaturally : function() {

        // deemed to have ended naturally if the final position of the
        // track is within the last 1% of the track
        // TODO improve  If the user manually pauses when the track
        // is in it's last 1% then the next track will get played which is bad.
        return ((buffer.duration - position) < (buffer.duration / 100));
    },

    pause : function(e){

        stopPositionUpdating();
        if (source){
            source.stop();
        }
        setIsPlayingStatus(false);
        playlist.updateTrackPlayingStatus(-1);
    },

    setIsPlayingStatus : function(status){
        isPlaying = status;
        if (firstTrackLoaded){
            render(true);
        }
    },

    setPosition : function(position){
        position = position;
        $("#trackPosition").slider("value", position);
        $("#trackTime").html(timeMask(position));
    },

    stopPositionUpdating : function(){
        clearInterval(updatePositionInterval);
    },

    onSliderStart : function(){

        // set a flag to resume playback after slider stops moving
        if (isPlaying){
            resumeAfterSliding = true;
        }

        // stop playback
        triggerPauseEvent();
    },

    onSliderStop : function(e, ui){

        if (resumeAfterSliding){
            triggerPlayEvent(null, ui.value);
        } else {
            position = ui.value;
            $("#trackTime").html(timeMask(ui.value));
        }
        resumeAfterSliding : false;
    },

    skipForward : function(){
        var playlistLength = playlist.getTrackList().length;
        if (tracklistIndex < (playlistLength -1)){
            tracklistIndex++;
            triggerPlayEvent(tracklistIndex, 0);
            playlist.updateTrackPlayingStatus(tracklistIndex);
        }
    },

    skipBack : function(playTrack){

        // only skip back to the previous track if still near beginning
        if (nearStart() && tracklistIndex > 0){
            tracklistIndex--;
        }

        if (isPlaying){
            triggerPauseEvent();
        }

        if (playTrack){
            setTimeout( function(){
                triggerPlayEvent(tracklistIndex,0);
            },10);

        } else {
            // TODO - give feedback to use about currently selected track
        }

    },

    nearStart : function(){

        // deemed to be near the start if within the first two seconds of the track start
        return (position < 2);
    },

    setSkipButtonStates : function(){
        if (tracklistIndex >= (playlist.getTrackList().length - 1)){
            $("#skipForwardButton").button("disable");
        } else {
            $("#skipForwardButton").button("enable");
        }
    }


});