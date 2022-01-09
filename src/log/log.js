const winston = require('winston')

const consoleTransport = new winston.transports.Console({ json: false, timestamp: true })
const myWinstonOptions = {
  transports: [consoleTransport],
  format: getRequestLogFormatter(),
}
// eslint-disable-next-line new-cap
const log = new winston.createLogger(myWinstonOptions)
function getRequestLogFormatter() {
  const { combine, timestamp, printf } = winston.format

  return combine(
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  )
}
module.exports = log
