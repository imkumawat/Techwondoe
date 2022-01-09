// Import dependencies
const jwt = require('jsonwebtoken')
const log = require('../log/log')

/**
 * definging the functionality of verifyAccessToken api
 * @param req client request
 * @param res server response
 * @return callback for valid jwt access token
 */
// eslint-disable-next-line consistent-return
function verifyAccessToken(req, res, callback) {
  try {
    if (!req.headers.authorization) {
      log.error('Access token is missing')
      return res.status(404).json({ message: 'Account is locked' })
    }
    try {
      const tokenSecret = process.env.TOKEN_SECRET || '09f26e402586e2faa8da4c98a35f1b20d6b033c6'
      // verifying the jwt access token
      jwt.verify(req.headers.authorization, tokenSecret)
      callback()
    } catch (err) {
      log.error(err)
      return res.status(401).json({ message: 'Authorization failed' })
    }
  } catch (e) {
    log.error(e)
    return res.status(400).json({ message: 'Internal Server Error. Please try again later' })
  }
}

module.exports = verifyAccessToken
