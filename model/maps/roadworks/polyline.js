define([
    "jquery",
    "timelineRender",
    "mapsPolylineBase",
    "mapsRoadWorksCard",
    "httpRequest",
], function ($, timelineRender, mapsPolylineBase, mapsRoadWorksCard, httpRequest,) {
    return {
        strokeColor: "#3700B3FF",
        category: "roadworks",
        endpoint: "data.json",
        allowedCategory: ["show-all", "roadworks"],
        delay: 80,

        initRoadWorks: function (category) {
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
                                mapsRoadWorksCard.initRoadworksCard(val);
                                if (index === data[self.category].length - 1)
                                    resolve();
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