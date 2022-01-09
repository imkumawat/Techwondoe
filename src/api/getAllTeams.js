// Import dependencies
const team = require('../model/team')
const company = require('../model/company')
const log = require('../log/log')

/**
 * defining the functionality of mergeCompanywithTeam to form
 * all teams as an array grouped within company object
 * @param cdata object of all company attributes
 * @param tdata object of all teams
 * @resovle r for successful creation of all teams as an array grouped within company object
 */
function mergeCompanywithTeam(cdata, tdata) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const r = await cdata.reduce(async (acc, val) => {
        const accr = await acc
        const re = {}
        re.uuid = val.uuid
        re.companyName = val.companyName
        re.companyCeo = val.companyCeo
        re.companyAdd = val.companyAdd
        re.inceptionDate = val.inceptionDate
        re.teams = tdata.filter((v) => v.companyId === val.uuid)
        accr.push(re)
        return accr
      }, Promise.resolve([]))
      resolve(r)
    } catch (e) {
      log.error(`mergeCompanywithTeam(): catch: ${e}`)
      reject(e)
    }
  })
}

/**
 * definging the functionality of of getAllTeams api
 * @param req client request
 * @param res server response
 */
// eslint-disable-next-line consistent-return
function getAllTeams(req, res) {
  try {
    // executing query on company collection to an create object of company data
    company.find({}, { _id: 0, __v: 0 })
      // eslint-disable-next-line consistent-return
      .then((doc) => {
        if (doc == null || (Array.isArray(doc) && !doc.length)) {
          return res.status(404).json({ message: 'No Team Found', data: [] })
        }
        const cdata = Array.isArray(doc) ? doc : [doc]
        // executing query on team collection to an create object of team data
        team.find({}, { _id: 0, __v: 0 })
          .then((doc1) => {
            let tdata = []
            if (!(doc1 == null || (Array.isArray(doc1) && !doc1.length))) {
              tdata = Array.isArray(doc1) ? doc1 : [doc1]
            }
            mergeCompanywithTeam(cdata, tdata)
              .then((result) => res.status(200).json({ message: 'Success', data: result }))
              .catch((e) => {
                log.error(e)
                return res.status(500).json({ message: 'Internal server error' })
              })
          })
          .catch((err) => {
            log.error(err)
            return res.status(500).json({ message: 'Internal server error' })
          })
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

module.exports = getAllTeams
