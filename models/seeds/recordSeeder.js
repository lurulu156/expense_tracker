const db = require('../../config/mongoose')
const Expense = require('../expense')
// require data
const recordList = require('./record.json').results
const userList = require('./user.json').results
const Category = require('../category')
const User = require('../user')
// bcrypt
const bcrypt = require('bcryptjs')
//create seeds
db.once('open', () => {
  console.log('mongodb connected!')
  Promise.all(userList.map(user => {
    const {name, password} = user
    bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      User.create({email,})
    })
  }))
  Promise.all(recordList.map(item => {
    const { name, date, price } = item
    return Category.findOne({ name: item.category })
      .then(category => Expense.create({ name, date, category, price }))
  }))
    .then(() => {
      console.log('record seeds done')
      process.exit()
    })
})



// db.once('open', () => {
//   console.log('mongodb connected!')
//   Promise.all(recordList.map(item => {
//     const { name, date, price } = item
//     return Category.findOne({ name: item.category })
//       .then(category => Expense.create({ name, date, category, price }))
//   }))
//     .then(() => {
//       console.log('record seeds done')
//       process.exit()
//     })
// })