define([
    "gmaps"
], function (gmaps) {
    return {
        decodePolyline: function (polyline) {
            return gmaps.geometry.encoding.decodePath(polyline);
        },

        generateMinutes: function (seconds) {
            return Math.floor(seconds / 60);
        },

        generateKilometers: function (meters) {
            return (meters / 1000);
        },

        generateDate: function (time) {
            var date = new Date(time),
                yr = date.getFullYear(),
                month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
                day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                newDate = yr + '-' + month + '-' + day;

            return newDate;
        }

    }
});