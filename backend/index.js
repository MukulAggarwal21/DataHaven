const connectToMongo = require('./db')
connectToMongo();
const express = require('express')

const app = express()
const port = 5000

app.use(express.json())

//Available Routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))


//we did not prefer this below way because the below one cause a lot of a mess , therefore we do routes in particular folder and get it here as shown in above lines
// app.get('/', (req, res) => {
//   res.send('Hello Mukul!')
// })

app.listen(port, () => {
  console.log(`iNotebook backend  listening at5 http://localhost:${port}`)
})


