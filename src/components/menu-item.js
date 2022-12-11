import React from 'react'
import { Typography, Grid } from '@mui/material'

const MenuItem = props => {
  return (
    <Grid
      container
      style={{
        width: `calc(${window.screen.width}px - 750px)`,
        textAlign: 'start',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Grid item xs={1}>
        <Typography variant="h5">{`${props.id}.`}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5">{`${props.name}`}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">{`Lorjjasj asl nbsanxksanxko alkn onxisonaoxm saninxsoan xo ionioxnsa `}</Typography>
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'center' }}>
        <Typography variant="h5">{props.price}</Typography>
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'end' }}>
        <img
          srcSet={`${props.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={props.name}
          loading="lazy"
          style={{ width: '120px', height: '100px', borderRadius: 10 }}
        />
      </Grid>
    </Grid>
  )
}

export default MenuItem
