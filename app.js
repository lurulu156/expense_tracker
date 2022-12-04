const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars') //for handlebar helper
const bodyParser = require('body-parser')
const Category = require('./models/category')
const Expense = require('./models/expense')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

//setup handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//handlebars helper for odd/even
Handlebars.registerHelper('ifEven', function (conditional, options) {
  if ((conditional % 2) == 0) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
});
Handlebars.registerHelper('select', function (selected, option) {
  return (selected == option) ? 'selected="selected"' : ''
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// routes
// // view all items
// app.get('/', (req, res) => {
//   const sort = { name: req.query.sort }
//   if (!req.query.sort) {
//     return Expense.find()
//       .lean()
//       .then(expenses => {
//         let totalAmount = 0
//         expenses.forEach(item => totalAmount += item.price)
//         return res.render('index', { expenses, totalAmount, sort })
//       })
//   } else {
//     Category.findOne(sort)
//       .then(category => {
//         return Expense.find({ category })
//           .lean()
//           .then(expenses => {
//             let totalAmount = 0
//             expenses.forEach(item => totalAmount += item.price)
//             res.render('index', { expenses, totalAmount, sort })
//           })
//       })
//   }
// })
// //create new item
// app.get('/expense/new', (req, res) => {
//   res.render('new')
// })
// app.post('/expense', (req, res) => {
//   const { name, date, category, price } = req.body
//   Category.findOne({ name: category })
//     .then(category => Expense.create({ name, date, category, price }))
//     .then(() => res.redirect('/'))
//     .catch(err => console.log(err))
// })
// //edit item
// app.get('/expense/:expense_id/edit', (req, res) => {
//   const _id = req.params.expense_id
//   return Expense.findOne({ _id })
//     .lean()
//     .then(expense => {
//       return Category.findOne(expense.category)
//         .then(category => {
//           expense.category = category.name
//           return res.render('edit', { expense })
//         })
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))
// })
// app.put('/expense/:expense_id', (req, res) => {
//   const _id = req.params.expense_id
//   const { name, date, category, price } = req.body
//   return Expense.findOne({ _id })
//     .then(expense => {
//       return Category.findOne({ name: category })
//         .then(category => {
//           expense.category = category
//           expense.name = name
//           expense.date = expense.date.replaceAll('-', '/')
//           expense.date = date
//           expense.price = price
//           return expense.save()
//         })
//         .catch(err => console.log(err))
//     })
//     .then(() => res.redirect(`/`))
//     .catch(err => console.log(err))
// })

// //delete item
// app.delete('/expense/:expense_id', (req, res) => {
//   const _id = req.params.expense_id
//   return Expense.findOne({ _id })
//   .then(expense => expense.remove())
//   .then(() => res.redirect('/'))
//   .catch(err => console.log(err))
// })
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})