module.exports = function (req, res) {
  let dataObject = {
    v:      0.1,
    data:   null,
    errors: [],
  };
  res.setHeader('Content-Type', 'application/json');

  if (!req.query.username || !req.query.username.trim()) {
    dataObject.errors.push("No username sent");
    return res.status(400)
              .send(JSON.stringify(dataObject));
  } else {
    User.findOne({ 'local.username':  req.query.username }, (err, user) => {
      if (err) {
        dataObject.errors.push("Something broke on our side");
        res.status(502);
      } else if (!user) {
        dataObject.data = "Nup";
        res.status(404);
      } else {
        dataObject.data = "Yup";
        res.status(200);
      }

      res.send(JSON.stringify(dataObject));
    });
  }
};
