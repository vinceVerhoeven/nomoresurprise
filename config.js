requirejs.config({
    paths: {
        jquery: 'https://code.jquery.com/jquery-3.6.0.min',
        gmaps: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCNO9hBFmClvwadTG8iL9IUEVhGvmxNKHM&libraries=geometry',
        uiComponent: 'view/js/uiComponent',
        uiComponentTotal: "view/js/uiComponentTotal",
        httpRequest: 'model/http/request',
        timelineRender: 'model/timeline/render',
        userData: 'model/maps/user/data',
        mapsHelper: 'model/maps/helper/data',
        mapsRender: 'model/maps/render',
        mapsTotalsBase: 'model/maps/totalBase',
        mapsPolylineBase: 'model/maps/polylineBase',
        mapsCardBase: 'model/maps/cardBase',
        mapsJamsCard: 'model/maps/jams/card',
        mapsJamsPolyLine: 'model/maps/jams/polyline',
        mapsRoadWorksCard: 'model/maps/roadworks/card',
        mapsRoadWorksPolyLine: 'model/maps/roadworks/polyline',
    },
    shim: {
        gmaps: {
            exports: 'google.maps'
        }
    },
    deps: [
        'view/lib/swipe-events',
        'controller/index'
    ],
});