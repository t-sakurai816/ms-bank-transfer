const express = require('express')
const transfer = require('./v1/transfer.js')

const router = express.Router()

router.use('/v1/transfer', transfer)

module.exports = router
