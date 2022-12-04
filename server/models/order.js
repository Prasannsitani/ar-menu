const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  total_amount: Object,
  status: String,
  timestamp: Object,
  ordered_table: String,
  ordered_items: Array,
})

module.exports = mongoose.model('Order', orderSchema)
