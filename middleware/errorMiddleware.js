const errorMiddleware = (error, req, res, next) => {
  res.status(error.statusCode);
  res.send({
    error: {
      status: error.statusCode,
      mitteilung: error.message
    }
  });
};

module.exports = errorMiddleware;