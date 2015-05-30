;(function () {
  app.views.MessagesView = app.views.ContentView.extend({
    initialize: function (options) {
      var me = this;

      // Call the superclass.
      app.views.ContentView.prototype.initialize.apply(me, arguments);

      me.itemTemplateUrl = options.itemTemplateUrl;
      me.itemTemplatePromise = null;
      me.collectionEl = options.collectionEl;
      me.socketUrl = options.socketUrl;
      me.socket = null;
    },

    render: function () {
      var me = this;

      // Call the superclass.
      app.views.ContentView.prototype.render.apply(me, arguments);

      // Kind of annoying, but we have to allow the parent view to finish
      // rendering before doing anything that depends on it, otherwise, we get
      // zalgo-bugs.
      _.defer(function () {
        me.startSocket();

        if (!me.itemTemplatePromise) {
          me.itemTemplatePromise = Promise.resolve($.get(me.itemTemplateUrl))
        }

        me.collection.on('change add reset', me.onCollectionChange.bind(me));
        me.collection.fetch({
          reset: true
        });
      });

      return me;
    },

    renderCollection: function () {
      var me = this;

      me.itemTemplatePromise
        .then(function (data) {
          var $collectionEl = $(me.el).find(me.collectionEl);

          $collectionEl.empty();
          
          me.collection.each(function (message) {
            var $item = $(data);

            $item.find('.name').text(message.get('name'));
            $item.find('.text').text(message.get('text'));
            $item.find('.time')
              .text(message.get('time'))
              .attr('title', message.get('time'));

            $(me.collectionEl).append($item);
          });

          $(me.el).find('abbr.timeago').timeago();

          $(me.el).find('.messages').stop().animate({ scrollTop: 10000000 }, 500);
        })
        .catch(function (response) {
          // TODO: Handle failure...
        });
    },

    remove: function () {
      var me = this;

      // Call the superclass.
      app.views.ContentView.prototype.remove.apply(me, arguments);

      me.stopSocket();

      return me;
    },

    startSocket: function () {
      var me = this;

      me.socket = io(me.socketUrl);
      me.socket.on('message', me.onMessage.bind(me));

      return me;
    },

    stopSocket: function () {
      me.socket.close();
      me.socket = null;

      return me;
    },

    onMessage: function (data) {
      var me = this;
      var message;
      var existingMessage = me.collection.findWhere({ uuid: data.uuid });

      if (existingMessage) {
        return;
      }

      message = new app.models.Message({
        uuid: data.uuid,
        name: data.name,
        text: data.text,
        time: data.time
      });

      me.collection.add(message);
    },

    onCollectionChange: function () {
      var me = this;

      me.renderCollection();
    },

    events: {
      'submit .message-form': 'submit'
    },

    submit: function (e) {
      var me = this;
      var name = app.name || 'Anonymous';
      var text = me.$el.find('.message-form [name="text"]').val()
      var time = new Date().toISOString();

      var message = new app.models.Message({
        uuid: uuid.v1(),
        name: name,
        text: text,
        time: time
      });

      me.collection.add(message);

      window.model = message

      message.save();

      me.$el.find('.message-form [name="text"]').val('');
    }
  });
})();

