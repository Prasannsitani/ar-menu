import * as React from 'react'
import { Card as MuiCard, Stack, CardActionArea, styled } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const Item = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  '&:hover': {
    borderLeft: '4px solid #3958CE',
  },
}))

const Card = () => {
  return (
    <Item sx={{ minWidth: 275, borderRadius: 4 }}>
      <CardActionArea a>
        <CardContent>
          <Stack
            direction={{ md: 'row' }}
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Stack alignItems="flex-start" spacing={2}>
              <Typography variant="h5">Task #0305</Typography>
              <Stack direction={{ md: 'row' }} alignItems="center" spacing={1}>
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography variant="subtitle2">As soon as</Typography>
              </Stack>
            </Stack>
            <Typography variant="h5" fontWeight="bold">
              $500
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Item>
  )
}

export default Card
