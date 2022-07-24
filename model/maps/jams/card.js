define([
    "jquery",
    "mapsCardBase"
], function ($, mapsCardBase) {

    return {
        initJamsCard: function (data) {
            mapsCardBase.initCardBase(data, function (card) {
                if(data.stop)
                    mapsCardBase.setClosedTill(card, data.stop);
                if (data.delay)
                    mapsCardBase.setDelay(card, data.delay);
                if (data.distance)
                    mapsCardBase.setDistance(card, data.distance);

                mapsCardBase.cardAppend(card);
            });
        }
    }
});