define([
    "jquery",
    "gmaps",
    "mapsRender",
    "mapsHelper",
], function ($, gmaps, mapsRender, mapsHelper) {

    return {
        cardFocusClass: "focus",
        cardContainerClass: ".sidebar-wrapper-bottom",
        cardClass: ".card-medium",
        cardSampleClass: ".card-medium.hide-on-all",
        cardHideClass: "hide-on-all",
        cardActionClass: ".card-action",
        cardTitleCLass: ".card-title",
        cardSubTitleClass: ".card-title-sub",
        cardDetailPreClass: ".card-details-pre",
        cardDetailAfterClass: ".card-details-after",

        initCardBase: function (data, callback) {
            var card = $(this.cardSampleClass).clone();
            $(card).removeClass(this.cardHideClass);

            this.setTitle(card, data);
            this.setSubTitle(card, data);
            this.setCardActionAttributes(card, data);

            callback(card);
        },

        setCardActionAttributes: function (card, dataObj) {
            $(card).attr("data-cat", dataObj.category);
            $(card).find(this.cardActionClass).attr("data-lon", dataObj.toLoc.lon);
            $(card).find(this.cardActionClass).attr("data-lat", dataObj.toLoc.lat);
            $(card).find(this.cardActionClass).attr('data-id', dataObj.id);
        },

        setTitle: function (card, dataObj) {
            $(card).find(this.cardTitleCLass).text(dataObj.road);
        },

        setSubTitle: function (card, dataObj) {
            $(card).find(this.cardSubTitleClass).text(
                "van " + dataObj.from + " naar " + dataObj.to
            );
        },

        setClosedTill: function (card, closedTill) {
            $(card).find(this.cardDetailPreClass).text("Dicht tot");
            $(card).find(this.cardDetailAfterClass).text(mapsHelper.generateDate(closedTill));
        },

        setDelay: function (card, delay) {
            $(card).find(this.cardDetailPreClass).text('+' + mapsHelper.generateMinutes(delay) + 'min');
        },

        setDistance: function (card, distance) {
            $(card).find(this.cardDetailAfterClass).text(mapsHelper.generateKilometers(distance) + 'km');
        },

        setFocus: function (id) {
            $('[data-id="' + id + '"]').closest(this.cardClass).addClass(this.cardFocusClass);
        },

        cardAppend: function (card) {
            $(card).appendTo(this.cardContainerClass);
        },

        resetFocus: function () {
            var self = this;
            $(this.cardClass).each(function () {
                $(this).removeClass(self.cardFocusClass);
            });
        },

        resetCards: function () {
            $(this.cardContainerClass).contents(':not(' + this.cardSampleClass + ')').remove();
        }
    }
});