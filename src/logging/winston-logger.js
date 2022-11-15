const {createLogger, transports, format} = require('winston');

const winston = require('winston');
require('winston-daily-rotate-file');

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  dirname: './logs/winston/',
  filename: 'error-%DATE%.log',
  // datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '1m',
  maxFiles: '30d'
});

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
  return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${info.message}`
}))

const logger = createLogger({
  // exitOnError: false,
  format: customFormat,
  transports: [
    new transports.Console({level: 'info'}),
    dailyRotateFileTransport
  ]
});

module.exports = {logger};