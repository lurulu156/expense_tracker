const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Web app start')
})

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})