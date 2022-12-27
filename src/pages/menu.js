import React from 'react'
import { Divider, Stack } from '@mui/material'
import Assets from '../assets'
import { Table } from '../components'
import useFetch from 'react-fetch-hook'

const Menu = props => {
  const { data, isLoading, error } = useFetch('/get-menu-list') || {}

  if (isLoading) return null
  if (error) return null
  return (
    <Stack
      sx={{
        width: `calc(${window.screen.width}px)`,
        alignItems: 'center',
      }}
      spacing={6}
    >
      <Stack marginTop={4}>
        <img
          src={Assets.Menu}
          alt={props.name}
          loading="lazy"
          style={{
            width: '450px',
            alignSelf: 'center',
            paddingLeft: 50,
          }}
        />
        <Divider
          sx={{
            background: 'white',
            width: '25%',
            alignSelf: 'center',
            padding: 0.2,
            borderRadius: 10,
          }}
        />
      </Stack>
      <Table data={data} />
    </Stack>
  )
}

export default Menu
