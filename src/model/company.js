const mongoose = require('mongoose')

const { Schema } = mongoose
const company = new Schema({

  uuid: { type: String, unique: true },
  companyName: { type: String },
  companyCeo: { type: String },
  companyAddress: { type: String },
  inceptionDate: { type: Date }
})

module.exports = mongoose.model('company', company, 'Company')
