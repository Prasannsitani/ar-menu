import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  Typography,
  Box,
  Stack,
  Button,
} from '@mui/material'
import { Menu } from './pages'
import { isMobile } from 'react-device-detect'
import ScreenLockRotationIcon from '@mui/icons-material/ScreenLockRotation'

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
})

const App = () => {
  if (isMobile) {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              width: `calc(${window.screen.width}px)`,
              height: `calc(${window.screen.height}px)`,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack alignItems="center" spacing={2}>
              <ScreenLockRotationIcon sx={{ fontSize: 50, color: 'white' }} />
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  alignSelf: 'center',
                }}
              >
                {`Use Desktop Screen For Better Experience`}
              </Typography>
              <Button onClick={() => window.location.reload()}>Reload</Button>
            </Stack>
          </Box>
        </ThemeProvider>
      </div>
    )
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
