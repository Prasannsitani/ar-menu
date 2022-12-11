import React from 'react'
import {
  Typography,
  Stack,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  List,
  Paper,
} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import { useParams } from 'react-router-dom'
import { OrderInfoItem } from '../components'

const OrderInfo = props => {
  const { id } = useParams()

  function renderRow(props) {
    const { index, style } = props

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h2" color="#000" fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Stack
        alignItems="flex-start"
        justifyContent="flex-start"
        spacing={4}
        sx={{ padding: 5 }}
      >
        <Typography variant="h4" color="#2C2B40" fontWeight="bold">
          Order Info
        </Typography>
        <Stack spacing={4} style={{ maxHeight: 600, overflow: 'auto' }}>
          {[
            {
              id: 1,
              imageUrl:
                'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
              name: 'Fruity Pancake',
              quantity: 2,
              additional_info: 'without syrup',
              price: '$12',
            },
            {
              id: 2,
              imageUrl:
                'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
              name: 'Rice with wok vegetables',
              quantity: 3,
              additional_info: 'with teriyaki sauce',
              price: '$15',
            },
            {
              id: 3,
              imageUrl:
                'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
              name: 'Spring Salad',
              quantity: 1,
              price: '$14',
            },
            {
              id: 4,
              imageUrl:
                'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
              name: 'Fruity Pancake',
              quantity: 2,
              additional_info: 'without syrup',
              price: '$12',
            },
            {
              id: 4,
              imageUrl:
                'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
              name: 'Fruity Pancake',
              quantity: 2,
              additional_info: 'without syrup',
              price: '$12',
            },
            {
              id: 4,
              imageUrl:
                'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
              name: 'Fruity Pancake',
              quantity: 2,
              additional_info: 'without syrup',
              price: '$12',
            },
          ].map((item, index) => {
            return <OrderInfoItem {...item} key={index} />
          })}
        </Stack>
        <Typography
          variant="h3"
          fontWeight="bold"
          alignSelf="flex-end"
          paddingRight="20px"
        >
          $5000
        </Typography>
      </Stack>
    </Stack>
  )
}

export default OrderInfo
