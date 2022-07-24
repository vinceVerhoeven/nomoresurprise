define(["jquery"], function ($) {
    return {
        updateTotals: function (total, totalJams, totalRoadWorks, totalDistance) {
            $("[data-total='all']").text(total);
            $("[data-total='jams']").text(totalJams);
            $("[data-total='roadworks']").text(totalRoadWorks);
            $("[data-total='distance']").text(totalDistance + 'km');
        }
    }
});