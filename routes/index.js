const express = require('express')
const router = express.Router()
// modules
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')

router.use('/expense', expenses)
router.use('/users', users)
router.use('/', home)

module.exports = router