define([], function () {
    return {
        userLocation: {lat: 52.2, lng: 4.8},

        getCurrentPosition: function () {
            var self = this;
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            self.setUserLocation(pos);
                            resolve(pos);
                        },
                        () => {
                            reject((self.getUserLocation()))
                        })
                } else {
                    reject(self.getUserLocation());
                }
            });
        },

        getUserLocation: function () {
            return this.userLocation;
        },

        setUserLocation: function (location) {
            this.userLocation = location;
        }
    }
});