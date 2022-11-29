const express = require('express')
const bodyParser = require('body-parser')
const data = require('./data.json')
const Fruit = require('./models/fruits')
const People = require('./models/people')
const mongoose = require('mongoose')

const app = express()

// header to prevent CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// db connection
mongoose.connect('mongodb://localhost:27017/fruitsDB')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getData', (req, res) => {
  res.json(data)
})

app.post('/post', (req, res) => {
  console.log('Connected to React')

  const fruit = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'Pretty solid as fruit.',
  })

  fruit.save()

  res.redirect('/')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
