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

app.post('/signin.json', function (req, res) {
  var name = req.body.name;

  if (!name || !name.length) {
    // TODO: Handle failure...
  }

  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      name: name
    })
  );
});

app.get('/messages.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(req.messages.fetch()));
});

app.post('/messages.json', function (req, res) {
  var uuid = req.body.uuid;
  var name = req.body.name;
  var text = req.body.text;
  var time = req.body.time;

  if (!uuid || !uuid.length) {
    // TODO: Handle failure...
  }

  if (!name || !name.length) {
    // TODO: Handle failure...
  }

  if (!text || !text.length) {
    // TODO: Handle failure...
  }

  if (!time || !time.length) {
    // TODO: Handle failure...
  }

  var message = {
    uuid: uuid,
    name: name,
    text: text,
    time: time
  };

  req.messages.add(message);

  req.io.sockets.emit('message', message);

  res.setHeader('Content-Type', 'application/json')
  res.end('');
});

app.get('*', function (req, res) {
  res.render('index');
});

server = app.listen(process.env.PORT || 9292, function () {
  var port = server.address().port;

  console.log('server running on port ' + port);
});

io = socketio(server);

io.on('connection', function (socket) {
  console.log('socket started');
});

