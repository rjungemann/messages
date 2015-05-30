module.exports = function (req, res) {
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
};

