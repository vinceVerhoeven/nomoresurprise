define(["jquery"], function ($) {
    return {
        apiUrl: "./api/",

        getRequest: function (url, callback) {
            $.getJSON(url, function (data) {
                callback(data);
            }).fail(function () {
                console.warn("failed request");
            });
        },

        getUrl: function (category, time, endpoint) {
            return this.apiUrl + category + '/' + time + '-' + endpoint
        }
    }
});