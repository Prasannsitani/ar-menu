import React from 'react'
import { Typography, Stack } from '@mui/material'
import { useParams } from 'react-router-dom'
import { OrderInfoItem } from '../components'

const OrderInfo = props => {
  const { id } = useParams()

  return (
    <Stack spacing={4}>
      <Typography variant="h3">Admin Dashboard</Typography>
      <Stack
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ padding: 10 }}
        spacing={2}
      >
        <Typography variant="h4" color="#2C2B40">
          Order Info
        </Typography>
        <Stack spacing={2}>
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
          ].map((item, index) => {
            return <OrderInfoItem {...item} key={index} />
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default OrderInfo
