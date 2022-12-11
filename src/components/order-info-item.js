import { Divider, Grid, Stack, Typography, styled, Paper } from '@mui/material'
import React from 'react'

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }))

const OrderInfoItem = props => {
  return (
    <Stack>
      <Grid
        container
        style={{
          width: `calc(${window.screen.width}px - 750px)`,
          textAlign: 'start',
          alignItems: 'center',
        }}
      >
        <Grid item xs={2}>
          <img
            srcSet={`${props.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={props.name}
            loading="lazy"
            style={{ width: '120px', height: '100px', borderRadius: 10 }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">{props.name}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'end' }}>
          <Typography variant="h5">{`x${props.quantity}`}</Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'end' }}>
          <Typography variant="h5">without syrup</Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'end' }}>
          <Typography variant="h5">{props.price}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ width: '87%', alignSelf: 'flex-end' }} />
    </Stack>
  )
}

export default OrderInfoItem
