const express = require('express')
// const model = require('../../models/account.js')
const router = express.Router()
// const Transfer = model.Tccount

// http://localhost:3000/v1/transfer
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'success!!' })
})

module.exports = router
