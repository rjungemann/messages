;(function () {
  app.views.ContentView = app.views.View.extend({
    initialize: function (options) {
      var me = this;

      me.router = options.router;
      me.templateUrl = options.templateUrl;
      me.templatePromise = null;
    },

    render: function () {
      var me = this;

      if (!me.templatePromise) {
        me.templatePromise = Promise.resolve($.get(me.templateUrl))
      }

      me.templatePromise
        .then(function (data) {
          $(me.el).attr('class', 'view').html(data);
        })
        .catch(function (response) {
          // TODO: Handle failure...
        });

      return me;
    }
  });
})();

