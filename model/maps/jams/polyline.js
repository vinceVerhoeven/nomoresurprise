define([
    "jquery",
    "mapsPolylineBase",
    "mapsJamsCard",
    "timelineRender",
    "httpRequest",
], function ($, mapsPolylineBase, mapsJamsCard, timelineRender, httpRequest,) {
    return {
        strokeColor: "#018786",
        category: "jams",
        endpoint: "data.json",
        allowedCategory: ["show-all", "jams"],
        delay: 80,

        initJams: function (category) {
            var self = this;
            return new Promise((resolve) => {
                if ($.inArray(category, self.allowedCategory) >= 0) {

                    let time = timelineRender.getTime();
                    let url = httpRequest.getUrl(self.category, time, self.endpoint);

                    timelineRender.setCategory(category);
                    httpRequest.getRequest(url, function (data) {
                        var delay = 0;
                        $.each(data[self.category], function (index, val) {
                            delay += self.delay;
                            setTimeout(function () {
                                mapsPolylineBase.initPolyLine(val, self.strokeColor);
                                mapsJamsCard.initJamsCard(val);
                                if (index === data[self.category].length - 1)
                                    resolve(mapsPolylineBase.getTotals());
                            }, delay);
                        });
                    })
                } else {
                    resolve();
                }
            })
        }
    }
});