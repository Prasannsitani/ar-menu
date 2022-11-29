const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fruitsSchema = new Schema({
  name: String,
  rating: Number,
  review: String,
})

module.exports = mongoose.model('Fruit', fruitsSchema)
