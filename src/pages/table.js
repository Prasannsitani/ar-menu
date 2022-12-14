import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Stack, Typography, Divider } from '@mui/material'
import { TableCard } from '../components'

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <TableCard number={1} />
      </Grid>
      <Grid item xs={4}>
        <TableCard number={2} />
      </Grid>
      <Grid item xs={4}>
        <TableCard number={3} />
      </Grid>
    </React.Fragment>
  )
}

const Table = props => {
  return (
    <Stack
      sx={{
        height: `calc(${window.screen.height}px - 200px)`,
        justifyContent: 'center',
        marginLeft: 12,
        marginRight: 4,
      }}
      spacing={2}
    >
      <Typography
        className="gradientText"
        variant="h1"
        color="white"
        fontWeight="bold"
      >{`Tables`}</Typography>
      <Divider
        sx={{
          background: 'white',
          width: '10%',
          height: '2px',
          alignSelf: 'center',
        }}
      />
      <Grid container spacing={3}>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Table
