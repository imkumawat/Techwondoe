// Import dependencies
const crypto = require('crypto')
const team = require('../model/team')
const company = require('../model/company')
const log = require('../log/log')

/**
 * defining the functionality of checkUUID of the company
 * @param uuid the unique id of the company
 * @resolve true if company uuid is exist in the database
 */
function checkUUID(uuid) {
  return new Promise((resolve, reject) => {
    try {
      log.info(`checkUUID(): Finding company based on UUID ${uuid}`)
      company.findOne({ uuid })
        .then((doc) => {
          if (doc == null) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
    } catch (e) {
      log.error(`checkUUID(): catch: ${e}`)
      reject(e)
    }
  })
}

/**
 * @param body contain the name of the team
 * @param uuid the company id in which the team need to be created
 * @returns  the createTeamData object
 */
function createTeamObj(body, uuid) {
  const createTeamData = {}
  const userId = crypto.randomUUID({ disableEntropyCache: true })
  createTeamData.uuid = userId
  createTeamData.companyId = uuid
  createTeamData.teamLeadName = body.teamLeadName

  return createTeamData
}

/**
 * defining the functionality of createTeam api
 * @param req client request
 * @param res server response
 */
// eslint-disable-next-line consistent-return
function createTeam(req, res) {
  try {
    if (!req.params.uuid) {
      return res.status(404).json({ message: 'company uuid is not specified' })
    }
    if (!req.body) {
      log.error(`Body not defined`)
      return res.status(404).json({ message: 'body not defined' })
    }

    if (!req.body.teamLeadName) {
      log.error(`teamLeadName not defined`)
      return res.status(404).json({ message: 'teamLeadName not found' })
    } if (typeof req.body.teamLeadName !== 'string') {
      log.error(`teamLeadName is invalid type ${req.body.teamLeadName}`)
      return res.status(400).json({ message: 'teamLeadName is not string type' })
    }
    checkUUID(req.params.uuid)
      // eslint-disable-next-line consistent-return
      .then((isUUID) => {
        if (!isUUID) {
          log.error(`createTeam(): given UUID not found in company collection ${req.params.uuid}`)
          return res.status(404).json({ message: 'UUID not found' })
        }
        const createTeamData = createTeamObj(req.body, req.params.uuid)
        // execuing query on team collection
        team.create(createTeamData)
          .then((doc) => {
            log.info(`doc : ${JSON.stringify(doc)}`)
            return res.status(201).json({ message: 'Success', data: createTeamData })
          })
          .catch((err) => {
            log.error(err)
            return res.status(500).json({ message: 'Internal server error' })
          })
      }).catch((e) => {
        log.error(e)
        res.status(500).json({ message: 'Internal server error. Please try again later' })
      })
  } catch (e) {
    log.error(e)
    return res.status(500).json({ message: 'Internal server error. Please try again later' })
  }
}

module.exports = createTeam
