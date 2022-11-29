const mongoose = require('mongoose')
const Schema = mongoose.Schema

const peoplesSchema = new Schema({
  name: String,
  age: Number,
})

module.exports = mongoose.model('People', peoplesSchema)
