const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const helpers = require('./helpers/handlebars')

require('./config/mongoose')

// setup handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main', extname: '.hbs', helpers: helpers
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})