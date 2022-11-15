const {BaseError} = require("./errors");
const {logger} = require("../logging/winston-logger");
const {sendNotify} = require("../telegram-bot");

function handleError(err, req, res, next) {

  if (err instanceof BaseError) {
    logger.error(err.description)
    sendNotify(err.message + "\n" + err.description);
    return res.status(err.statusCode || 500).json(err.message);
  }

  // axios error
  if (err.response) {
    const {status, statusText} = err.response;
    const {baseURL, method, url, data} = err.response.config;
    let response = err.response.data;
    if (response instanceof Buffer) {
      response = response.toString();
    }
    const description = {method, baseURL, url, data, status, statusText, response};
    logger.error(JSON.stringify(description))
    sendNotify(JSON.stringify(description));
    return res.status(status).json(response);
  }

  // other error
  logger.error(err)
  sendNotify(err.message || "Some errors happened!");
  return res.status(500).json(err.message);

}

module.exports = {handleError}