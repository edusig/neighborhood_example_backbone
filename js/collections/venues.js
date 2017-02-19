var app = app || {};

(function() {
    var neightborhoodVenues = [ 
        { name: 'Campinas', position: { lat: -22.909938, lng: -47.062633}},
    ]

    var Venues = Backbone.Collection.extend({
        model: app.Venue,

        initialize: function() {
            this.search(-22.909938, -47.062633);
        },

        search: function(arg1, arg2) {
            var self = this;
            app.foursquare.search(arg1, arg2).done(function(response){
                var venues = response.response.venues.map(self.foursquareConvert);
                console.log(arg1, arg2, venues, response);
                self.recreate(venues);
            }).fail(function(error) {
                console.error(error);
                self.recreate();
            });
        },

        foursquareConvert: function(venue) {
            return {
                name : venue.name,
                position: {
                    lat: venue.location.lat,
                    lng: venue.location.lng,
                },
                stats : venue.stats,
            };
        },

        recreate: function(venues) {
            this.each(function(venue) {
                var mark = venue.get('instance');
                mark.setMap(null);
            });
            this.reset(venues);
        }
    });

    app.Venues = new Venues(neightborhoodVenues);
})();