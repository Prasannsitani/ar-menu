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
mongoose.connect('mongodb://localhost:27017/test-restaurant')

// const menuData = new menu({
//   id: '638245755e5c938391f8ae9f',
//   name: 'Veg. Burger',
//   section: 'Burger Mania',
//   description:
//     'Enjoy fresh pan veg pizza with paneer, onion and capsicum toppings',
//   price: { value: '200', currency: 'INR' },
//   ar_enabled: true,
//   preview_image:
//     'https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0',
//   food_category: 'veg',
//   ar_info: {
//     type: 'MODEL',
//     url: 'https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf',
//   },
// })
// menuData.save()

// const orderData = new orders({
//   total_amount: {
//     value: 200,
//     currency: 'INR',
//     displayText: 'Rs. 200',
//   },
//   status: 'ORDERED',
//   timestamp: '1999-12-31T18:30:00.000+00:00',
//   ordered_table: 'Table 2',
//   ordered_items: [
//     {
//       item_id: '638c3061e702356bc256667b',
//       quantity: 3,
//     },
//     {
//       item_id: '638c30a4883f0b388c51511a',
//       quantity: 4,
//     },
//   ],
// })
// orderData.save()

// 638c3061e702356bc256667b
// 638c30a4883f0b388c51511a
// 638c30b93106e23c6ca2dd05

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
      } catch (err) {
        res.sendStatus(500)
      }
    }
  })

  res.status(200)
})

app.get('/get-orders', (req, res) => {
  orders.find((error, data) => {
    if (error) {
      res.sendStatus(500)
    } else {
      if (data) {
        res.json(data)
        res.status(200)
      } else {
        res.status(404).json({ error: 'No Orders Found' })
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
    if (err) throw err
  })

  res.sendStatus(200)
})

app.post('/post', (req, res) => {
  res.redirect('/')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
