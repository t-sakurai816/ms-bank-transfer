const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transferSchema = new Schema(
  {
    accountID: { type: Schema.Types.ObjectId, required: true, unique: true },
    accountType: { type: String, required: true },
    balance: { type: Number, required: true },
    ownerID: { type: String, required: true }
  },
  {
    versionKey: false
  }
)

exports.Transfer = mongoose.model('Transfer', transferSchema)
