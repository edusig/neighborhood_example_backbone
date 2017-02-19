var app = app || {};

(function() {
    function FoursquareApi() {
        var self = this;
        this.apikey = app.FOURSQUARE_API_KEY;
        this.apisecret = app.FOURSQUARE_API_SECRET;
        this.redirect = app.FOURSQUARE_REDIRECT;
        this.endpoints = {
            search: 'https://api.foursquare.com/v2/venues/search',
        }

        this.baseData = {
            client_id : this.apikey,
            client_secret: this.apisecret,
            v: 20170218,
        }

        this.search = function(arg1, arg2) {
            if(arg2 && typeof arg2 == 'number') {
                return this.searchArea(arg1, arg2);
            }
            return this.searchTerm(arg1);
        }

        this.searchTerm = function(term) {
            var data = Object.assign(self.baseData);
            data.query = term;
            return $.ajax({
                url: self.endpoints.search,
                data: data,
                dataType: 'json'
            })
        }

        this.searchArea = function(lat, lng) {
            var data = Object.assign(self.baseData);
            data.ll = lat.toString()+','+lng.toString();
            return $.ajax({
                url: self.endpoints.search,
                data: data,
                dataType: 'json'
            })
        }

    }
    app.foursquare = new FoursquareApi();
})();