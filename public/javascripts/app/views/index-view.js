;(function () {
  app.views.IndexView = app.views.ContentView.extend({
    events: {
      'submit .signin-form': 'submit'
    },

    submit: function (e) {
      var me = this;
      var data;

      e.preventDefault();

      data = {
        name: me.$el.find('.signin-form [name="name"]').val()
      }

      Promise.resolve($.post('/signin.json', data))
        .then(function (data) {
          // Set the user name.
          app.name = data.name;

          app.router.navigate('messages', {
            trigger: true
          });
        })
        .catch(function (response) {
          // TODO: Handle failure...
        });
    }
  });
})();

