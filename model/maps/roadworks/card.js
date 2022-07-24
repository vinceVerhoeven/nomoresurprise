define([
    "jquery",
    "mapsCardBase"
], function ($, mapsCardBase) {

    return {
        initRoadworksCard: function (data) {
            mapsCardBase.initCardBase(data, function (card) {
                // jam only attributes
                if (data.stop)
                    mapsCardBase.setClosedTill(card, data.stop);

                mapsCardBase.cardAppend(card);
            });
        }
    }
});