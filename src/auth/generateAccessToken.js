/* eslint-disable no-useless-escape */
const jwt = require('jsonwebtoken')
const log = require('../log/log')

/**
 * definging the functionality of verify useremail
 * @param email email address
 * @return true if email address is valid
 */
function verifyuseremail(email) {
  const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

  if (!email) { return false }

  if (email.length > 254) { return false }

  const valid = tester.test(email)
  if (!valid) { return false }

  // Further checking of some things that regex can't handle
  const parts = email.split('@')
  if (parts[0].length > 64) { return false }

  const domainParts = parts[1].split('.')
  if (domainParts.some((part) => part.length > 63)) { return false }

  return true
}

/**
 * definging the functionality of generateAccessToken api
 * @param req client request
 * @param res server response
 */
function generateAccessToken(req, res) {
  try {
    if (!req.body) {
      log.error(`Body not defined`)
      return res.status(404).json({ message: 'body not defined' })
    }
    if (!req.body.useremail) {
      log.error(`useremail not defined`)
      return res.status(404).json({ message: 'useremail not found' })
    } if (typeof req.body.useremail !== 'string') {
      log.error(`useremail is invalid type ${req.body.useremail}`)
      return res.status(400).json({ message: 'useremail is not string type' })
    }
    if (!verifyuseremail(req.body.useremail)) {
      log.error(`email is invalid ${req.body.useremail}`)
      return res.status(400).json({ message: 'Invalid email' })
    }

    const { useremail } = req.body
    const tokenSecret = process.env.TOKEN_SECRET || '09f26e402586e2faa8da4c98a35f1b20d6b033c6'

    // generating jwt access token and valid for half an hour
    const token = jwt.sign({ useremail }, tokenSecret, { expiresIn: '1800s' })
    return res.status(200).json({ message: 'Token Generation Success', jwt: token })
  } catch (e) {
    log.error(e)
    return res.status(400).json({ message: 'Internal Server Error. Please try again later' })
  }
}

module.exports = generateAccessToken
