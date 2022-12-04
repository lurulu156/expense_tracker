const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

// view all items
router.get('/', (req, res) => {
  const sort = { name: req.query.sort }
  if (!req.query.sort) {
    return Expense.find()
      .lean()
      .then(expenses => {
        let totalAmount = 0
        expenses.forEach(item => totalAmount += item.price)
        return res.render('index', { expenses, totalAmount, sort })
      })
  } else {
    Category.findOne(sort)
      .then(category => {
        return Expense.find({ category })
          .lean()
          .then(expenses => {
            let totalAmount = 0
            expenses.forEach(item => totalAmount += item.price)
            res.render('index', { expenses, totalAmount, sort })
          })
      })
  }
})

module.exports = router