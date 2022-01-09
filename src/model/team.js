const mongoose = require('mongoose')

const { Schema } = mongoose
const team = new Schema({

  uuid: { type: String, unique: true },
  companyId: { type: String },
  teamLeadName: { type: String }
})

module.exports = mongoose.model('team', team, 'Team')
