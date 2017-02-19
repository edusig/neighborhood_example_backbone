var app = app || {};

(function() {
    app.Venue = Backbone.Model.extend({
        defaults : {
            name : '',
            position: {
                lat: null,
                lng: null,
            },
            stats: {
                checkinsCount: 0,
                usersCount: 0,
                tipCount: 0,
            }
        },
    });
})();