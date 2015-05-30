$(function () {
  app.router = new app.routers.Router({
    el: $('main')
  });

  Backbone.history.start({
    pushState: true
  });
});

