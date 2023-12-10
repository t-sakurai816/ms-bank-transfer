const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transferSchema = new Schema(
  {
    fromAccountID: { type: String, required: true },
    toAccountID: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true }
  },
  {
    versionKey: false
  }
)

exports.Transfer = mongoose.model('Transfer', transferSchema)
