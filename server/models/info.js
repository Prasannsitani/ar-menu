const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infoSchema = new Schema({
  name: String,
  theme: Object,
  sections: Array,
  image_url: String,
})

module.exports = mongoose.model('Info', infoSchema)
