module.exports = function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(req.messages.fetch()));
};

