define([
    "jquery",
    "httpRequest",
    "timelineRender",
    "mapsHelper"
], function ($, httpRequest, timelineRender, mapsHelper) {

    return {
        category: "total",
        endpoint: "total.json",

        getTotals: function () {
            return new Promise((resolve) => {
                let time = timelineRender.getTime();
                let url = httpRequest.getUrl(this.category, time, this.endpoint);
                httpRequest.getRequest(url, function (data) {
                    resolve({
                        totalCount: data["all"]["count"],
                        totalJams: data["jams"]["count"],
                        totalRoadworks: data["roadwork"]["count"],
                        totalDistance: mapsHelper.generateKilometers(data["all"]["distance"])
                    });
                })
            }, this);
        }
    }
});