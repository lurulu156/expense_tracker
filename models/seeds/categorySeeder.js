const mongoose = require('mongoose')
// require data
const categoryList = require('./category.json').results
const categoryLength = Object.keys(categoryList).length
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
  Promise.all(categoryList.map(item => {
    const { name, image } = item
    return Category.create({ name, image })
  }))
    .then(() => {
      console.log('category seeds done')
      process.exit()
    })
})