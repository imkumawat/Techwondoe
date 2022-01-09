const express = require('express')

const router = express.Router()

const generateAccessToken = require('../auth/generateAccessToken')
const verifyAccessToken = require('../auth/verifyAccessToken')

router.post('/generateaccesstoken', generateAccessToken)

const createCompany = require('../api/createCompany')
const searchCompanyByName = require('../api/searchCompanyByName')
const getCompanyById = require('../api/getCompanyById')
const createTeam = require('../api/createTeam')
const getAllTeams = require('../api/getAllTeams')

router.get('/getallteams', verifyAccessToken, getAllTeams)
router.post('/createteam/:uuid', verifyAccessToken, createTeam)
router.get('/getcompanybyid/:uuid', verifyAccessToken, getCompanyById)
router.get('/searchcompanybyname/:companyName', verifyAccessToken, searchCompanyByName)
router.post('/createcompany', verifyAccessToken, createCompany)

module.exports = router
