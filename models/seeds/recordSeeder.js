const db = require('../../config/mongoose')
const Expense = require('../expense')
// require data
const recordList = require('./record.json').results
const Category = require('../category')
//create seeds
db.once('open', () => {
  console.log('mongodb connected!')
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