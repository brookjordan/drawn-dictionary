module.exports = function(res, addingData) {
  res.locals.renderData = res.locals.renderData || {};
  return Object.assign(res.locals.renderData, addingData);
};
