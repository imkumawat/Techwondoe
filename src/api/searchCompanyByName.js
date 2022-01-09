// Import dependencies
const company = require('../model/company')
const log = require('../log/log')

/**
 * definging the functionality of searchCompanyByName api
 * @param req client request
 * @param res server response
 */
// eslint-disable-next-line consistent-return
function searchCompanyByName(req, res) {
  try {
    if (!req.params.companyName) {
      log.error(`companyName not defined`)
      return res.status(404).json({ message: 'companyName not found' })
    }

    const companyData = { companyName: req.params.companyName }
    log.info(`obj = ${JSON.stringify(companyData)}`)

    // execuing query company collection
    company.find(companyData, { _id: 0, __v: 0 })
      .then((doc) => {
        if (doc == null || (Array.isArray(doc) && !doc.length)) {
          log.error(`No Company found with company name ${req.params.companyName}`)
          return res.status(404).json({ message: 'Company not found' })
        }
        log.info(`doc : ${JSON.stringify(doc)}`)
        return res.status(200).json({ message: 'Success', data: Array.isArray(doc) ? doc : [doc] })
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
module.exports = searchCompanyByName
