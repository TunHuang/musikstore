const createError = require('http-errors');
const User = require('../models/user-model');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.tokenUser.userId});
    if (!user.admin) {
      throw 'Nur Administratoren dürfen das tun.'
    }
    next();
  } catch (err) {
    const error = createError(401, 'Einloggen fehlgeschlagen ' + err);
    next(error);
  }
};