const mongoose = require('mongoose')
const Expense = require('../models/expense')
// require data
const recordList = require('./record.json')
const categoryList = require('./category.json')
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
  //create category
  
  //create record


  for (let i = 0; i < 8; i++) {
    Restaurant.create(
      {
        name: `${restaurantList.results[i].name}`,
        name_en: `${restaurantList.results[i].name_en}`,
        category: `${restaurantList.results[i].category}`
      }
    )
  }
  console.log('seeds done')
})