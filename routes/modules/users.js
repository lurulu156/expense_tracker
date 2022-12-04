const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  //檢查email是否有註冊過
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('Email already registered.')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password, confirmPassword })
          .then(() => res.redirect('/users/login'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))

})

module.exports = router