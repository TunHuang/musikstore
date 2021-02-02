const undefinedController = (req, res, next) => {
  let error = new Error('Diesen Pfad gibt es nicht.');
  error.statusCode = 404;
  next(error);
};

module.exports = undefinedController;