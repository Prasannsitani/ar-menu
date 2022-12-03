const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Models
const menu = require('./models/menu')

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const menuData = new menu({
  type: 'MENU',
  items: [
    {
      id: '638245755e5c938391f8ae9f',
      name: 'Veg. Pizza',
      section: 'Pizza Mania',
      description:
        'Enjoy fresh pan veg pizza with paneer, onion and capsicum toppings',
      price: { value: '200', currency: 'INR' },
      ar_enabled: true,
      preview_image:
        'https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0',
      food_category: 'veg',
      ar_info: {
        type: 'MODEL',
        url: 'https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf',
      },
    },
    {
      id: '638245755e5c938391f8ae9f',
      name: 'Veg. Pizza',
      section: 'Pizza Mania',
      description:
        'Enjoy fresh pan veg pizza with paneer, onion and capsicum toppings',
      price: { value: '200', currency: 'INR' },
      ar_enabled: true,
      preview_image:
        'https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0',
      food_category: 'veg',
      ar_info: {
        type: 'MODEL',
        url: 'https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf',
      },
    },
    {
      id: '638245755e5c938391f8ae9f',
      name: 'Aloo Tikki Burger',
      section: 'Burger Mania',
      description:
        'Enjoy fresh aloo tikki burger with potato, onion and capsicum toppings',
      price: { value: '200', currency: 'INR' },
      ar_enabled: true,
      preview_image:
        'https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0',
      food_category: 'veg',
      ar_info: {
        type: 'MODEL',
        url: 'https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf',
      },
    },
  ],
})
// menuData.save()

app.get('/get-menu', (req, res) => {
  let _data = {}

  menu.findOne((error, menus) => {
    if (error) {
      res.status(500)
    } else {
      try {
        menus.items.forEach(item => {
          if (item) {
            if (_data[item.section]) {
              _data[item.section] = [..._data[item.section], { ...item }]
            } else {
              _data[item.section] = [{ ...item }]
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

app.post('/post', (req, res) => {
  res.redirect('/')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
