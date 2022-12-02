const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
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

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// view all items
app.get('/', (req, res) => {
  res.render('index')
})
//create new item
app.get('/expense/new', (req, res) => {
  res.render('new')
})
app.post('/expense', (req, res) => {
  const {name, date, category, price} = req.body
  Category.findOne({name: category})
  .then(category => Expense.create({name, date, category: category._id, price}))
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