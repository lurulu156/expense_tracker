const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

//create new item
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, price } = req.body
  Category.findOne({ name: category })
    .then(category => Expense.create({ name, date, category, price, userId }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
//edit item
router.get('/:expense_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.expense_id
  return Expense.findOne({ _id, userId })
    .lean()
    .then(expense => {
      return Category.findOne(expense.category)
        .then(category => {
          expense.category = category.name
          return res.render('edit', { expense })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})
router.put('/:expense_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.expense_id
  const { name, date, category, price } = req.body
  return Expense.findOne({ _id, userId })
    .then(expense => {
      return Category.findOne({ name: category })
        .then(category => {
          expense.category = category
          expense.name = name
          expense.date = expense.date.replaceAll('-', '/')
          expense.date = date
          expense.price = price
          return expense.save()
        })
        .catch(err => console.log(err))
    })
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

//delete item
router.delete('/:expense_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.expense_id
  return Expense.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router