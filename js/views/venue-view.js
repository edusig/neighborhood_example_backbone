var app = app || {};

(function(){

    app.VenueView = Backbone.View.extend({
        tagName: 'li',
        className: 'venue-item',

        initialize: function() {
            this.render();
        },

		template: _.template($('#search-item-template').html()),

        render : function() {
			this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })
})();