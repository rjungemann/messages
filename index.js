// Libraries
var path = require('path');
var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var socketio = require('socket.io');

// Classes
var Messages = require('./lib/messages');

var app = express();
var io;
var server;
var messages = new Messages();

app.set('view engine', 'ejs');

app.use(partials());

app.use(
  cookieSession({
    keys: ['secret123']
  })
);

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// Allow for messages to be accessed without a global variable.
app.use(function (req, res, next) {
  req.messages = messages;

  next();
});

// Allow for io to be seen by requests for broadcasting.
app.use(function (req, res, next) {
  req.io = io;

  next();
});

app.post('/signin.json', require('./lib/handlers/signin-handler'));
app.get('/messages.json', require('./lib/handlers/messages-get-handler'));
app.post('/messages.json', require('./lib/handlers/messages-post-handler'));
app.get('*', require('./lib/handlers/wildcard-handler'));

server = app.listen(process.env.PORT || 9292, function () {
  var port = server.address().port;

  console.log('server running on port ' + port);
});

io = socketio(server);

io.on('connection', function (socket) {
  console.log('socket started');
});

