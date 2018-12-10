module.exports = function (req, res) {
  console.log(req.app.mountpath);
  res.render('index.pug');
}
