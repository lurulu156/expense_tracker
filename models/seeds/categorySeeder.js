const db = require('../../config/mongoose')
// require data
const categoryList = require('./category.json').results
const Category = require('../category')
//create seeds
db.once('open', () => {
  Promise.all(categoryList.map(item => {
    const { name, image } = item
    return Category.create({ name, image })
  }))
    .then(() => {
      console.log('category seeds done')
      process.exit()
    })
})