;(function () {
  app.models.Message = Backbone.Model.extend({
    attributes: {
      uuid: null,
      name: null,
      text: null,
      time: null
    }
  });
})();

