import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { Avatar } from '@mui/material'
import Stack from '@mui/material/Stack'
import { IconButton } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { Link } from 'react-router-dom'

const drawerWidth = 70

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Box
        sx={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          background: '#21222D',
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://tse1.mm.bing.net/th?id=OIP.TUDe74-_OR6O3P4V-3_FYQHaE7&pid=Api&P=0"
          sx={{ alignSelf: 'center', border: `2px solid #4054A9` }}
        />
      </Box>
      <Stack
        sx={{
          display: 'flex',
          flex: 1,
          padding: '10px',
          justifyContent: 'center',
          background: '#21222D',
          height: `calc(${window.screen.height}px - 232px)`,
        }}
        spacing={1}
      >
        <Link to="/">
          <IconButton size="large" color="inherit">
            <AcUnitIcon sx={{ color: 'white' }} />
          </IconButton>
        </Link>

        <Link to="/menu">
          <IconButton size="large" color="inherit">
            <AcUnitIcon sx={{ color: 'white' }} />
          </IconButton>
        </Link>

        <Link to="/table">
          <IconButton size="large" color="inherit">
            <AcUnitIcon sx={{ color: 'white' }} />
          </IconButton>
        </Link>

        {/* <Link to="/login">
          <IconButton size="large" color="inherit">
            <AcUnitIcon sx={{ color: 'white' }} />
          </IconButton>
        </Link> */}
      </Stack>
    </div>
  )

  const container = window.document.body

  return (
    <Box sx={{ display: 'flex', border: 'none' }}>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          border: 'none',
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderWidth: 0,
              border: 0,
              outline: 'none',
            },
            border: 0,
            outline: 'none',
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'inline-block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default Header
