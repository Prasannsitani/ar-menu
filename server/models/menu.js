const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
  name: String,
  section: String,
  description: String,
  price: Object,
  ar_enabled: Boolean,
  preview_image: String,
  food_category: String,
  ar_info: Object,
})

module.exports = mongoose.model('Menu', menuSchema)
