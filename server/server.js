const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Models
const menu = require('./models/menu')
const orders = require('./models/order')

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
mongoose.connect('mongodb+srv://admin:admin@ar-menu.jvvucuy.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/get-menu', (req, res) => {
  let _data = {}

  menu.find((error, menus) => {
    if (error) {
      res.sendStatus(500)
    } else {
      try {
        menus.forEach(item => {
          if (item) {
            if (_data[item.section]) {
              _data[item.section] = [..._data[item.section], { ...item._doc }]
            } else {
              _data[item.section] = [{ ...item._doc }]
            }
          } else {
            res.sendStatus(404)
          }
        })
        res.json(_data)
        return
      } catch (err) {
        res.sendStatus(500)
        return
      }
    }
  })
})

app.get('/menu-item/:id', (req, res) => {
  const id = req.params.id

  try {
    if (id) {
      menu.findById(id, (error, item) => {
        if (error) {
          res.sendStatus(404)
          return
        }
        if (!item) {
          res.sendStatus(404)
          return
        }
        res.json(item)
      })
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.log('err : ', err)
    res.sendStatus(500)
  }
})

app.get('/get-orders', (req, res) => {
  orders.find((error, data) => {
    if (error) {
      res.sendStatus(500)
      return
    } else {
      if (data) {
        res.json(data)
      } else {
        res.sendStatus(404)
        return
      }
    }
  })
})

// Need to see again.
app.get('/get-orders/:id', (req, res) => {
  const id = req.params.id

  orders.findById(id, async (error, order) => {
    if (error) throw error

    if (order) {
      let ordered_items = []

      order.ordered_items.forEach(item => {
        // menu.findById(item.item_id, (error, menu_item) => {
        //   if (error || !menu_item) throw error
        //   // ordered_items = [...ordered_items, menu_item]
        //   // console.log('menu item : ', { ...item, ...menu_item._doc })
        //   // ordered_items.push({ ...item, ...menu_item._doc })
        ordered_items.push(item)
        // })
      })
      res.json({ ...order._doc, ordered_items })
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/place-order', (req, res) => {
  const params = req.body

  const order_item = {
    total_amount: {
      value: params.total_amount,
      currency: 'INR',
      displayText: `Rs ${params.total_amount}`,
    },
    status: 'ORDERED',
    ordered_table: params.ordered_table,
    timestamp: {
      value: Date.now(),
      displayText: new Date(Date.now()).toLocaleString({
        locales: 'en-US',
      }),
    },
    status: 'ORDERED',
    ordered_items: params.ordered_items,
  }

  orders.create(order_item, (err, item) => {
    if (err) {
      res.sendStatus(500)
      return
    }
  })

  res.sendStatus(200)
})

app.post('/menu-item/add', (req, res) => {
  const params = req.body

  const item = {
    ...params,
    price: {
      value: params.price,
      currency: 'INR',
      displayText: `Rs. ${params.price}`,
    },
  }

  menu.create(item, err => {
    if (err) {
      console.log('err : ', err)
      res.sendStatus(500)
      return
    } else {
      res.sendStatus(200)
    }
  })
})

app.delete('/menu-item/del', (req, res) => {
  try {
    menu.findByIdAndDelete(req.body.id, error => {
      if (error) {
        res.sendStatus(500)
        return
      }
    })
  } catch (err) {
    res.sendStatus(404)
    return
  }
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
