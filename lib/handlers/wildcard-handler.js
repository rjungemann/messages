module.exports = function (req, res) {
  res.render('index', {
    name: req.session.name
  });
};

