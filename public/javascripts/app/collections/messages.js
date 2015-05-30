;(function () {
  app.collections.Messages = Backbone.Collection.extend({
    url: '/messages.json',
    model: app.models.Message
  });
})();

