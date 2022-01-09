// Import dependencies
const crypto = require('crypto')
const company = require('../model/company')
const log = require('../log/log')

/**
 * defining companyObj function to create an object of the company information
 * @param data contain the information about company attriutes
 * @return     the companyData object
 */
function companyObj(data) {
  const companyData = {}
  //  generating a random unique id
  const userId = crypto.randomUUID({ disableEntropyCache: true })
  companyData.uuid = userId
  companyData.companyName = data.companyName
  companyData.companyCeo = data.companyCeo
  companyData.companyAddress = data.companyAddress
  companyData.inceptionDate = data.inceptionDate

  return companyData
}

/**
 * defining the functionality of the createCompany api
 * @param req client request
 * @param res server response
*/
// eslint-disable-next-line consistent-return
function createCompany(req, res) {
  try {
    if (!req.body) {
      log.error(`Body not defined`)
      return res.status(404).json({ message: 'body not defined' })
    }

    if (!req.body.companyName) {
      log.error(`companyName not defined`)
      return res.status(404).json({ message: 'companyName not found' })
    }

    if (typeof req.body.companyName !== 'string') {
      log.error(`companyName is invalid type ${req.body.companyName}`)
      return res.status(400).json({ message: 'companyName is not string type' })
    }

    if (!req.body.companyCeo) {
      log.error(`companyCeo not defined`)
      return res.status(404).json({ message: 'companyCeo not found' })
    }

    if (typeof req.body.companyCeo !== 'string') {
      log.error(`companyCeo is invalid type ${req.body.companyCeo}`)
      return res.status(400).json({ message: 'companyCeo is not string type' })
    }

    if (!req.body.companyAddress) {
      log.error(`companyAddress not defined`)
      return res.status(404).json({ message: 'companyAddress not found' })
    }

    if (typeof req.body.companyAddress !== 'string') {
      log.error(`companyAddress is invalid type ${req.body.companyAddress}`)
      return res.status(400).json({ message: 'companyAddress is not string type' })
    }

    if (!req.body.inceptionDate) {
      log.error(`InceptionDate not defined`)
      return res.status(404).json({ message: 'InceptionDate not found' })
      // eslint-disable-next-line no-else-return
    } else if ((new Date(req.body.inceptionDate) === 'Invalid Date')
      // eslint-disable-next-line no-restricted-globals
      || isNaN(new Date(req.body.inceptionDate))) {
      log.error(`InceptionDate is invalid ${req.body.inceptionDate}`)
      return res.status(400).json({ message: 'InceptionDate is invalid' })
    }

    const companyData = companyObj(req.body)

    log.info(`obj = ${JSON.stringify(companyData)}`)

    // execuing the database query on company collection
    company.create(companyData)
      .then((doc) => {
        log.info(`doc : ${JSON.stringify(doc)}`)
        return res.status(201).json({ message: 'Success', data: companyData.uuid })
      })
      .catch((err) => {
        log.error(err)
        return res.status(500).json({ message: 'Internal server error' })
      })
  } catch (e) {
    log.error(e)
    return res.status(500).json({ message: 'Internal server error. Please try again later' })
  }
}

module.exports = createCompany
