var app = app || {};

(function($) {

    app.AppView = Backbone.View.extend({
        el: '#neightborhood_app',

        events : {
            'submit #search_form' : 'search',
        },

        search: function(event) {
            event.preventDefault();
            event.stopPropagation();
            var term = $('#search_venues').val();
            var self = this;
            console.log(app);
            app.Venues.search(term);
        },

        initialize: function() {
            var self = this;
            this.search_input = $('#search_Venues');
            this.$list = $('#result_list');
            this.map = new google.maps.Map(document.getElementById('nmap'), {
                zoom: 14,
                center: app.Venues.first().get('position'),
            });
            app.Venues.on('add remove reset', function() {
                self.render();
            })
            this.render();
        },

        render: function() {
            var self = this;
            var subview = null;
            var listHTML = [];
            var bounds = new google.maps.LatLngBounds();
            app.Venues.each(function(venue) {
                var marker = new google.maps.Marker({
                    position: venue.get('position'),
                    map: self.map,
                    title: venue.get('name'),
                });
                bounds.extend(marker.getPosition());
                venue.set('instance', marker);
			    subview = new app.VenueView({ model: venue });
                listHTML.push(subview.el.outerHTML);
            });
            this.map.fitBounds(bounds);
            this.$list.html(listHTML.join(''));
            $('#search_result_area').show();
        }
    })

})(jQuery);