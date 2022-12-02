const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars') //for handlebar helper
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Category = require('./models/category')
const Expense = require('./models/expense')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// setup mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//setup handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//handlebars helper for odd/even
Handlebars.registerHelper('ifEven', function (conditional, options) {
  if ((conditional % 2) == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes
// view all items
app.get('/', (req, res) => {
  const sort = { name: req.query.sort }
  if (!req.query.sort) {
    return Expense.find()
      .lean()
      .then(expenses => {
        let totalAmount = 0
        expenses.forEach(item => totalAmount += item.price)
        return res.render('index', { expenses, totalAmount })
      })
  } else {
    Category.findOne(sort)
      .then(category => category._id)
      .then(category => {
        return Expense.find({ category })
          .lean()
          .then(expenses => {
            let totalAmount = 0
            expenses.forEach(item => totalAmount += item.price)
            res.render('index', { expenses, totalAmount })})
      })
  }
})
//create new item
app.get('/expense/new', (req, res) => {
  res.render('new')
})
app.post('/expense', (req, res) => {
  const { name, date, category, price } = req.body
  Category.findOne({ name: category })
    .then(category => Expense.create({ name, date, category: category._id, price }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
//edit new item
app.get('/expense/edit', (req, res) => {
  res.render('edit')
})
//delete item


app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})