const express = require('express')
const router = express.Router()
// modules
const home = require('./modules/home')
const expenses = require('./modules/expenses')
router.use('/', home)
router.use('/expense', expenses)

module.exports = router