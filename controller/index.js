requirejs([
        "userData",
        "mapsRender",
        "timelineRender",
        "mapsPolylineBase",
        "mapsCardBase",
        "mapsJamsPolyLine",
        "mapsRoadWorksPolyLine",
        "mapsTotalsBase",
        "uiComponent",
        "uiComponentTotal"
    ],
    function (userData, mapsRender, timelineRender, mapsPolylineBase, mapsCardBase, mapsJamsPolyLine, mapsRoadWorksPolyLine, mapsTotalsBase, uiComponent, uiComponentTotal) {
        let userLocation = userData.getUserLocation();

        mapsRender.setMaps(userLocation, '#map');
        timelineRender.render();

        mapsRoadWorksPolyLine.initRoadWorks("show-all").then(() => {
            mapsJamsPolyLine.initJams("show-all").then(() => {
                mapsTotalsBase.getTotals().then((data) => {
                    uiComponentTotal.updateTotals(data.totalCount, data.totalJams, data.totalRoadworks, data.totalDistance);
                });
            });
        });

        uiComponent.create(".time-btn", "click", function (el) {
            uiComponent.addState(el.target, true);
            timelineRender.setTime(el.target.getAttribute('data-time'));
            mapsPolylineBase.resetPolyLines();
            mapsCardBase.resetCards();

            mapsJamsPolyLine.initJams(timelineRender.getCategory()).then(() => {
                mapsRoadWorksPolyLine.initRoadWorks(timelineRender.getCategory()).then(() => {
                    mapsTotalsBase.getTotals().then((data) => {
                        uiComponentTotal.updateTotals(data.totalCount, data.totalJams, data.totalRoadworks, data.totalDistance);
                    });
                })
            });
        });

        uiComponent.create("[data-action='show-all']", "click", function (el) {
            uiComponent.addState(el.target, true);
            mapsPolylineBase.resetPolyLines();
            mapsCardBase.resetCards();
            mapsJamsPolyLine.initJams("show-all").then(() => {
                mapsRoadWorksPolyLine.initRoadWorks("show-all");
            });
        });

        uiComponent.create("[data-action='show-jams']", "click", function (el) {
            uiComponent.addState(el.target, true);
            mapsPolylineBase.resetPolyLines();
            mapsCardBase.resetCards();
            mapsJamsPolyLine.initJams("jams");
        });

        uiComponent.create("[data-action='show-roadworks']", "click", function (el) {
            uiComponent.addState(el.target, true);
            mapsPolylineBase.resetPolyLines();
            mapsCardBase.resetCards();
            mapsRoadWorksPolyLine.initRoadWorks("roadworks");
        });

        uiComponent.create("[data-action='user-location']", "click", function (el) {
            userData.getCurrentPosition().then((location) => {
                mapsRender.setFocus(location.lat, location.lng, mapsRender.focusPosition);
            }).catch(function(defaultLocation) {
                mapsRender.setFocus(defaultLocation.lat, defaultLocation.lng, mapsRender.center);
            });
        });

        uiComponent.create('.card-action', 'click', function (el) {
            mapsRender.setFocus(
                el.target.getAttribute('data-lat'),
                el.target.getAttribute('data-lon'),
                mapsRender.focusZoom
            );
            mapsPolylineBase.openInfoWindow(
                el.target.getAttribute('data-id')
            );
        });

        uiComponent.create('.sidebar-wrapper-top', 'swiped-up', function (el) {
            uiComponent.addState('.sidebar');
        });

        uiComponent.create('.sidebar-wrapper-top', 'swiped-down', function (el) {
            uiComponent.removeState('.sidebar');
        });


    });