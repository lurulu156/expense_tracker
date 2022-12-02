const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Expense', expenseSchema)