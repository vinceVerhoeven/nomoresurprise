define(["jquery"], function ($) {

    $.fn.reverse = [].reverse;

    return {
        timelineClass: ".time-btn",
        timelineCat: "show-all",
        time: 0,

        render: function () {
            var self = this;
            $(this.timelineClass).reverse().each((index, el) => {
                let hour = self.getDateByHour(index);
                if (!index) {
                    $(el).text("Nu");
                } else {
                    $(el).text(hour);
                }
            });
        },

        getDateByHour: function (hour) {
            let dt = new Date();
            dt.setHours(dt.getHours() - hour);
            return dt.getHours() + ':00';
        },

        getCategory: function () {
            return this.timelineCat;
        },

        setCategory: function (category) {
            this.timelineCat = category;
        },

        getTime: function () {
            return this.time;
        },

        setTime: function (time) {
            this.time = time;
        }

    }
});
