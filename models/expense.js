const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('./category')
const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
  },
  category: Category.schema,
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Expense', expenseSchema)