module.exports = function (req, res) {
  var name = req.body.name;

  if (!name || !name.length) {
    // TODO: Handle failure...
  }

  req.session.name = name;

  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      name: name
    })
  );
};

