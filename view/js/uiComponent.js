define(["jquery"], function ($) {

    return {
        activeClass: "active",

        create: function (el, eventName, callback) {
            $(document).on(eventName, el, function (event) {
                callback(event);
            });
        },

        addState: function (el, resetAll) {
            if (resetAll)
                this.removeAllStates(el);
            $(el).addClass(this.activeClass);
        },

        removeState: function (el) {
            $(el).removeClass(this.activeClass);
        },

        removeAllStates: function (el) {
            var self = this;
            $(el).parent().children().each(function () {
                self.removeState( $(this));
            });
        }

    }
});