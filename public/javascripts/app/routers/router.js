;(function () {
  app.routers.Router = Backbone.Router.extend({
    initialize: function (options) {
      var me = this;

      me.el = options.el;
      me.currentView = null;

      me.indexView = new app.views.IndexView({
        templateUrl: '/templates/index.html'
      });

      me.messagesView = new app.views.MessagesView({
        socketUrl: 'http://localhost:9292',
        templateUrl: '/templates/messages.html',
        itemTemplateUrl: '/templates/message.html',
        collectionEl: '.messages',
        collection: new app.collections.Messages()
      });
    },

    routes: {
      "": "index",
      "messages": "messages"
    },

    index: function () {
      var me = this;

      me.switchView(me.indexView);
    },

    messages: function () {
      var me = this;

      me.switchView(me.messagesView);
    },

    switchView: function (view) {
      var me = this;

      if (me.currentView) {
        me.currentView.remove();
      }

      me.el.html(view.el);

      view.render();

      me.currentView = view;
    }
  });
})();

