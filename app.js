const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')

//set up handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/expense/new', (req, res) => {
  res.render('new')
})


app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})