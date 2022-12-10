import React from 'react'
import './App.css'
import { Header } from './components'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme()

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
