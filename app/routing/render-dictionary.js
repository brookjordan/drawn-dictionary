const addRenderData = require('./add-render-data');

module.exports = async function(req, res, next) {
  res.render('dictionary', addRenderData(res, {
    images: await ImageModel.find(),
    title:  'Dictionary',
  }));
};
