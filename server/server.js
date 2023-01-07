const { S3Client } = require('@aws-sdk/client-s3')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const multerS3 = require('multer-s3')

// ENV
require('dotenv').config()

// Models
const menu = require('./models/menu')
const orders = require('./models/order')
const info = require('./models/info')

const app = express()

// Header to prevent CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  res.header('Access-Control-Request-Method', 'POST')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// DB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// BODY Parser Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set DigitalOcean Spaces
const s3 = new S3Client({
  region: 'ap-south-1',
  endpoint: process.env.S3_BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
})

app.get('/', (req, res) => {
  res.json({
    error: null,
    data: null,
  })
})

app.get('/get-menu-list', (req, res) => {
  try {
    menu.find((error, menus) => {
      if (error) {
        res.sendStatus(500)
        return
      }
      res.json(menus)
    })
  } catch (err) {
    res.sendStatus(500)
    return
  }
})

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

app.post('/place-order', (req, res) => {
  const params = req.body

  const order_item = {
    total_amount: {
      value: params.total_amount,
      currency: 'INR',
      displayText: `Rs. ${params.total_amount}`,
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
    } else {
      res.json({ id: item._id })
    }
  })
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
      res.sendStatus(500)
      return
    } else {
      res.sendStatus(200)
    }
  })
})

app.post('/menu-item/del', (req, res) => {
  try {
    menu.findByIdAndDelete(req.body.id, error => {
      if (error) {
        res.sendStatus(500)
        return
      }
      res.sendStatus(200)
    })
  } catch (err) {
    res.sendStatus(404)
    return
  }
})

app.get('/home', async (req, res) => {
  let _menu = []
  let _info = {}
  let _data = {}

  try {
    _info = await info.findOne()
  } catch (err) {}

  try {
    _menu = await menu.find()
    if (_menu) {
      _menu.forEach(item => {
        if (item) {
          if (_data[item.section]) {
            _data[item.section] = [..._data[item.section], { ...item._doc }]
          } else {
            _data[item.section] = [{ ...item._doc }]
          }
        }
      })
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    res.sendStatus(404)
  }

  res.json({
    info: _info,
    menu: _data,
  })
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'public-asset',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, cb) => {
      cb(null, file.originalname)
    },
  }),
}).array('files', 2)

app.post('/update-menu', async (req, res) => {
  upload(req, res, error => {
    if (error) {
      return
    }

    const { id, name, price, description, section, category } = req.body
    const arModel =
      req.files?.[0]?.contentType === 'application/octet-stream'
        ? `https://${req.files?.[0]?.location}`
        : req.files?.[0]?.location
    const previewImage =
      req.files?.[1]?.contentType === 'application/octet-stream'
        ? `https://${req.files?.[1]?.location}`
        : req.files?.[1]?.location

    const updateObject = {
      name: name,
      section: section,
      description: description,
      price: {
        value: price,
        currency: 'INR',
        displayText: `Rs. ${price}`,
      },
      ar_enabled: true,
      food_category: category,
    }

    if (previewImage) {
      updateObject['preview_image'] = previewImage
    }

    if (arModel) {
      updateObject['ar_info'] = {
        type: 'MODEL',
        url: arModel,
      }
    }

    if (id === '') {
      menu.create(updateObject, err => {
        if (err) {
          res.sendStatus(500)
          return
        }

        res.redirect(process.env.ADMIN_URL)
      })
    } else {
      menu.findByIdAndUpdate(
        id,
        { $set: updateObject },
        { new: true },
        (err, item) => {
          if (err) {
            res.sendStatus(500)
            return
          }

          res.redirect(process.env.ADMIN_URL)
        },
      )
    }
  })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
