;(function () {
  app.views.View = Backbone.View.extend({
    remove: function () {
      // Empty the element and remove it from the DOM while preserving events.
      $(this.el).empty().detach();

      return this;
    }
  });
})();

