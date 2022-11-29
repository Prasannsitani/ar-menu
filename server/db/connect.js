const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fruitsDB')

// Schema for collections
const fruitsSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
})

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

// Model Based on Schema
const Fruit = mongoose.model('Fruit', fruitsSchema)
const People = mongoose.model('People', peopleSchema)

module.exports = { Fruit, People }
