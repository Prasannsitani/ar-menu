import React from 'react'
import { Typography, Stack, IconButton } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Card } from '../components'

const Orders = () => {
  return (
    <Stack sx={{ height: 'inherit', padding: '30px' }} spacing={4}>
      <Stack
        direction={{
          md: 'row',
        }}
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h3" fontWeight="900" color="#000000">
          Orders list
        </Typography>
        <IconButton>
          <MenuOpenIcon color="white" />
        </IconButton>
      </Stack>
      <Stack spacing={2}>
        {[
          { id: 1, price: 100 },
          { id: 2, price: 100 },
          { id: 3, price: 100 },
          { id: 4, price: 100 },
          { id: 5, price: 100 },
        ].map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </Stack>
    </Stack>
  )
}

export default Orders
