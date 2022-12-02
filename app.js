const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/expense/new', (req, res) => {
  res.render('new')
})
app.get('/expense/edit', (req, res) => {
  res.render('edit')
})


app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})