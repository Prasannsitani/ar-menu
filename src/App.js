import React from 'react'
import './App.css'
import { styled } from '@mui/material/styles'
import { Header } from './components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme, Box, Grid, Paper } from '@mui/material'
import { Orders, OrderInfo } from './pages'

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
            <Route
              path="/"
              element={
                <Box sx={{ background: '#21222D' }}>
                  <Grid container paddingLeft={10}>
                    <Grid item xs={4}>
                      <Item
                        sx={{
                          boxShadow: '0px 0px 5px 1px #969696',
                          borderTopLeftRadius: 20,
                          borderBottomLeftRadius: 20,
                          border: 0,
                          background: '#F8F8FA',
                        }}
                      >
                        <Header />
                        <Orders />
                      </Item>
                    </Grid>
                    <Grid item xs={8}>
                      <Item>
                        <OrderInfo />
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
