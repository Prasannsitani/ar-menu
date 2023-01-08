import React, { useState } from 'react'
import {
  Stack,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Button,
} from '@mui/material'
import { Table, ColorModal } from '../components'
import useFetch from 'react-fetch-hook'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

const Menu = props => {
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    data: {},
    showImage: false,
  })

  const [themeModal, setThemeModal] = useState({
    isOpen: false,
    data: {},
  })

  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
  })

  const { data, isLoading, error } =
    useFetch(`${process.env.REACT_APP_API_URL}/get-menu-list`) || {}

  const theme = useFetch(`${process.env.REACT_APP_API_URL}/get-info`)

  if (isLoading || theme.isLoading) return null
  if (error || theme.error) return null
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
            <Stack flexDirection="row">
              <Stack marginRight={2}>
                <Button
                  sx={{ alignSelf: 'flex-end' }}
                  variant="contained"
                  endIcon={<AddCircleIcon color="white" />}
                  onClick={() =>
                    setThemeModal({ isOpen: true, data: theme.data })
                  }
                >
                  Edit Ui
                </Button>
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
      <ColorModal
        data={themeModal.data}
        isOpen={themeModal.isOpen}
        onClose={() => setThemeModal({ isOpen: false, data: {} })}
        onOpenToast={message => setToast({ isOpen: true, message: message })}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={toast.isOpen}
        onClose={() => setToast({ isOpen: false, message: '' })}
        message={toast.message ? toast.message : 'Request Successfull'}
        TransitionComponent={props => <Slide {...props} direction="up" />}
      />
    </Stack>
  )
}

export default Menu
