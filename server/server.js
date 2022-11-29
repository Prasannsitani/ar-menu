const express = require('express')
const data = require('./data.json')
const app = express()
const { Fruit, People } = require('./db/connect')

const fruit = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'Pretty solid as fruit.',
})

app.get('/getData', (req, res) => {
  // res.send('Hello World!')
  res.json(data)
})

app.post('/post', (req, res) => {
  console.log('Connected to React')
  fruit.save()
  res.redirect('/')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
