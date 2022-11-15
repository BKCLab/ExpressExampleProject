const rfs = require("rotating-file-stream");

const errorsLogStream = rfs.createStream("errors.log", {
  interval: "1d",
  path: process.env.LOG_PATH
});

const morganBodyConfig = {
  noColors: true,
  dateTimeFormat: "iso",
  skip: (req, res) => res.statusCode < 400,
  stream: errorsLogStream
  // timezone: "Asia/Ho_Chi_Minh",
}

module.exports = {errorsLogStream, morganBodyConfig};