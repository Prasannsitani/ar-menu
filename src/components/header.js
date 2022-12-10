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

        <Link to="/orders">
          <IconButton size="large" color="inherit">
            <AcUnitIcon sx={{ color: 'white' }} />
          </IconButton>
        </Link>

        <Link to="/login">
          <IconButton size="large" color="inherit">
            <AcUnitIcon sx={{ color: 'white' }} />
          </IconButton>
        </Link>
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box> */}
    </Box>
  )
}

export default Header
