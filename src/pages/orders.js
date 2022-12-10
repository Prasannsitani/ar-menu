import React from 'react'
import { Typography, Stack } from '@mui/material'
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
        <MenuOpenIcon color="white" />
      </Stack>
      <Stack spacing={2}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Card />
        ))}
      </Stack>
    </Stack>
  )
}

export default Orders
