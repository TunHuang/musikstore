const createError = require('http-errors');
const User = require('../models/user-model');

module.exports = async (req, res, next) => {
  try {
    const isAdmin = await User.findOne({ email: req.email }).isAdmin;
    console.log(isAdmin);
    console.log(req.email);
    if (!isAdmin) {
      throw 'Nur Administratoren dürfen diese Aktion ausführen.';
    }
    next();
  } catch (err) {
    const error = createError(401, 'Einloggen fehlgeschlagen' + err);
    next(error);
  }
};