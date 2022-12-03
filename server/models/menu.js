const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
  type: String,
  items: Array,
})

module.exports = mongoose.model('Menu', menuSchema)
