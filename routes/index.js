const express = require('express')
const router = express.Router()
// modules
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')
const auth = require('./modules/auth')
// authenticate
const { authenticator } = require('../middleware/auth')

router.use('/expense', authenticator,expenses)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router