const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const helpers = require('./helpers/handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')

require('./config/mongoose')

// setup handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main', extname: '.hbs', helpers: helpers
}))

app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})