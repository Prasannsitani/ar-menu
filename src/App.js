import React from 'react'
import './App.css'
import { styled } from '@mui/material/styles'
import { Header } from './components'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { Orders, OrderInfo, Menu, Table } from './pages'

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: `calc(${window.screen.height}px - 160px)`,
  color: theme.palette.text.secondary,
}))

const App = () => {
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
