import React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import { IconButton } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '200px',
  boxShadow: '0px 0px 10px 1px #969696',
  color: theme.palette.text.secondary,
}))

const TableCard = props => {
  return (
    <Item>
      <Stack>
        <Stack spacing={2}>
          <Typography variant="h4" fontFamily="cursive">
            {`Table ${props.number}`}
          </Typography>
          <Typography variant="h6">
            cancosankcs anasijc aoncak oibsnc aocnsaoin cosnbciansscio asocnao
            suiabcoiasn coiasncoi ncsubcoiancoisnoi
          </Typography>
        </Stack>
        <IconButton
          sx={{
            alignSelf: 'flex-end',
          }}
        >
          <CloudDownloadIcon sx={{ height: '32px', width: '32px' }} />
        </IconButton>
      </Stack>
    </Item>
  )
}

export default TableCard
