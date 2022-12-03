const mongoose = require('mongoose')
const Expense = require('../expense')
// require data
const recordList = require('./record.json').results
const recordListLength = recordList.length
const Category = require('../category')
//set mongoose and env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//set DB connection status
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
//DB connect success
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