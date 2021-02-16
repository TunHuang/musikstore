const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT ?? 'Geheimnis');
    req.tokenUser = decodedToken;
    next();
  } catch (err) {
    const error = createError(401, 'Einloggen fehlgeschlagen.' + err);
    next(error);
  }
};