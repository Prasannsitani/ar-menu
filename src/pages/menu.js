import React, { useState } from 'react'
import {
  Stack,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Button,
} from '@mui/material'
import { Table } from '../components'
import useFetch from 'react-fetch-hook'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const Menu = props => {
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    data: {},
    showImage: false,
  })

  const { data, isLoading, error } =
    useFetch(`${process.env.REACT_APP_API_URL}/get-menu-list`) || {}

  if (isLoading) return null
  if (error) return null
  return (
    <Stack
      sx={{
        width: `calc(${window.screen.width}px)`,
        alignItems: 'center',
        padding: 2,
      }}
      spacing={2}
    >
      <AppBar
        position="static"
        sx={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Stack flexDirection="row" alignItems="center">
              <RestaurantMenuIcon
                sx={{
                  display: 'flex',
                  mr: 1,
                  fontSize: 'xs',
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                MENU
              </Typography>
            </Stack>
            <Stack>
              <Button
                sx={{ alignSelf: 'flex-end' }}
                variant="contained"
                endIcon={<AddCircleIcon color="white" />}
                onClick={() =>
                  setIsOpen({ isOpen: true, data: {}, showImage: true })
                }
              >
                Add Item
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Table
        data={data}
        isOpen={isOpen}
        onClose={() => setIsOpen({ isOpen: false, data: {}, showImage: false })}
        onOpen={data =>
          setIsOpen({ isOpen: true, data: data, showImage: false })
        }
      />
    </Stack>
  )
}

export default Menu
