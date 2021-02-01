const corsMiddleware = (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  next();
};

module.exports = corsMiddleware;