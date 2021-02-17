const createError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    const _id = req.params.id;
    if (_id !== req.tokenUser.userId) {
      throw 'Du darfst nur deine eigenen Daten einsehen und ändern.';
    }
    next();
  } catch (err) {
    const error = createError(401, err);
    next(error);
  }
};