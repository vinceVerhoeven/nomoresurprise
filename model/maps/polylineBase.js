define([
    "jquery",
    "gmaps",
    "mapsRender",
    "mapsCardBase",
    "mapsHelper"
], function ($, gmaps, mapsRender, mapsCardBase, mapsHelper) {
    return {
        polyLineArray: [],
        strokeOpacity: 1.0,
        strokeWeight: 3,

        initPolyLine: function (data, color) {
            var map = mapsRender.getMap();
            var infoWindow = this.initInfoWindow(data);

            var polyline = new gmaps.Polyline({
                path: mapsHelper.decodePolyline(data.polyline),
                geodesic: true,
                strokeColor: color,
                strokeOpacity: this.strokeOpacity,
                strokeWeight: this.strokeWeight,
            });

            polyline.addListener("click", function () {
                infoWindow.open(map);
                mapsCardBase.resetFocus();
                mapsCardBase.setFocus(data.id);
            });

            polyline.setMap(map);

            this.setPolyLineArray(data.id, polyline, infoWindow);
        },

        initInfoWindow: function (data) {
            var info = "geen gegevens";

            if (data.reason) {
                info = data.reason;
            } else if (data.events) {
                info = data.events[0].text;
            }

            return new gmaps.InfoWindow({
                content: info,
                position: {lat: data.toLoc.lat, lng: data.toLoc.lon}
            });
        },

        openInfoWindow: function (id) {
            $.each(this.getPolyLineArray(), (index, item) => {
                if (item.id == id) {
                    item.infoWindow.open(mapsRender.getMap());
                } else {
                    item.infoWindow.close()
                }
            });
        },

        resetPolyLines: function () {
            var self = this;
            $.each(this.getPolyLineArray(), (index, item) => {
                item.polyline.setMap(null);
            });
            self.polyLineArray = [];
        },

        setPolyLineArray: function (id, polyLineObj, infoWindowObj) {
            this.polyLineArray.push(
                {
                    id: id,
                    polyline: polyLineObj,
                    infoWindow: infoWindowObj
                }
            )
        },

        getPolyLineArray: function () {
            return this.polyLineArray;
        },

        getTotals: function () {
            return this.getPolyLineArray().length
        }
    }
});