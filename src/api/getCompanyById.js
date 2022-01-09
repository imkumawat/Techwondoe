// Import dependencies
const company = require('../model/company')
const log = require('../log/log')

/**
 * definging the functionality of of getCompanyById api
 * @param req client request
 * @param res server response
 */
// eslint-disable-next-line consistent-return
function getCompanyById(req, res) {
  try {
    if (!req.params.uuid) {
      log.error(`companyuuid not defined`)
      return res.status(404).json({ message: 'company uuid not found' })
    }
    const companyData = { uuid: req.params.uuid }
    log.info(`obj = ${JSON.stringify(companyData)}`)
    // execuing query company collection
    company.findOne(companyData, { _id: 0, __v: 0 })
      .then((doc) => {
        if (doc == null) {
          log.error(`No Company found with company uuid ${req.params.uuid}`)
          return res.status(404).json({ message: 'Company not found' })
        }
        log.info(`doc : ${JSON.stringify(doc)}`)
        return res.status(200).json({ message: 'Success', data: doc })
      })
      .catch((err) => {
        log.error(err)
        return res.status(500).json({ message: 'Internal server error 500' })
      })
  } catch (e) {
    log.error(e)
    return res.status(500).json({ message: 'Internal server error. Please try again later' })
  }
}
module.exports = getCompanyById
