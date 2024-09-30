async function errorHandlerMiddleware(err, req, res, next) {
  console.error(err);
  return res.status(500).json(err);
}

module.exports = { errorHandlerMiddleware };
