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
  Promise.all(userList.map(user => {
    const { email, password, recordId } = user
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({ email, password: hash })
        .then(user => {
          const userId = user._id
          return Promise.all(recordList.map(item => {
            if (recordId.includes(item.id)) {
              const { name, date, price } = item
              return Category.findOne({ name: item.category })
                .then(category => Expense.create({ name, date, category, price, userId }))
            }
          }))
        })
      )
  }))
  .then(() => {
    console.log('record seeds done')
    process.exit()
  })
})