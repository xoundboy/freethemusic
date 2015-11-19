
var _getMonthFormatted = function (dateObj) {
    var month = dateObj.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
};
var _getDayFormatted = function (dateObj) {
    var day = dateObj.getDate() + 1;
    return day < 10 ? '0' + day : '' + day;
};

var _secondsToHoursMinsSeconds = function(durationInSeconds){
    var sec_num = parseInt(durationInSeconds, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var time = "";

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10 && hours !== "00") {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours !== "00") {
        time += hours + ':';
    }
    time += minutes + ':' + seconds;
    return time;

};

module.exports = {

    formattedDate: function (date) {
        var dateObj = new Date(date);
        return _getMonthFormatted(dateObj) + "/" + _getDayFormatted(dateObj) + '/' + dateObj.getFullYear();
    },

    formattedDuration: function(duration){
        if (duration === 0){
            return '';
        } else {
            return _secondsToHoursMinsSeconds(duration);
        }
    },

    mysqlFormatDate: function (unformattedDate){
        var date = new Date(unformattedDate);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    },

    getUniqueAudioFileName: function (fields){
        var strippedTitle = fields.title.replace(/[^a-zA-Z0-9.]+/g,'');
        var strippedArtist = fields.actName.replace(/[^a-zA-Z0-9.]+/g,'');
        var random = Math.random()*100000000000000000;
        var longName = strippedTitle + '-' + strippedArtist + '-' + random;
        return longName.substring(0,46);
    }
};