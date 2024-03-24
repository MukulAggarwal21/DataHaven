const connectToMongo = require('./db')
connectToMongo();
const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Mukul!')
})

app.listen(port, () => {
  console.log(`Example app listening at5 http://localhost:${port}`)
})


