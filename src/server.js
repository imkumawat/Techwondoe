// Import dependencies
const dotenv = require('dotenv')

dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerUI = require('swagger-ui-express')
const basicAuth = require('express-basic-auth')

const app = express()
const http = require('http').Server(app)
const docs = require('../swagger.json')
const log = require('./log/log')

const dbstr = process.env.DB_CONNECTION_STRING || 'mongodb://mongo:27017/techwondoe'
mongoose.connect(
  dbstr,
  { useUnifiedTopology: true, useNewUrlParser: true }
)

const db = mongoose.connection

db.once('open', () => log.info('connected to the database'))

// checks if connection with the database is successful
db.on('error', () => log.error('MongoDB connection error:'))

// Create a new express application named 'app'

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000

/*
This application level middleware prints incoming requests to
the servers console, useful to see incoming requests
*/
app.use((req, res, next) => {
  log.info(`Request_Endpoint: ${req.method} ${req.url}`)
  next()
})

// Configure the bodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
// Configure the CORs middleware
app.use(cors())
const ps = process.env.PASSWORD || 'Techwondoe@2022'
app.use('/api-docs', basicAuth({
  users: { Techwondoe: ps },
  challenge: true,
}), swaggerUI.serve, swaggerUI.setup(docs))
const api = require('./routes/routes')

app.use('/api/v1/', api)

// Configure our server to listen on the port defiend by our port variable
http.listen(port, () => log.info(`BACK_END_SERVICE_PORT: ${port}`))
