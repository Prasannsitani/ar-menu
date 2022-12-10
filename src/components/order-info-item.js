import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'

const OrderInfoItem = props => {
  return (
    <>
      <Stack direction={{ md: 'row' }} spacing={2} alignItems="center">
        <img
          srcSet={`${props.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={props.name}
          loading="lazy"
          style={{ width: '60px', height: '60px', borderRadius: 10 }}
        />
        <Stack
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Typography> Order Info Card </Typography>
          <Divider />
        </Stack>
      </Stack>
    </>
  )
}

export default OrderInfoItem
