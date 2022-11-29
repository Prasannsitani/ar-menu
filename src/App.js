import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import useFetch from 'react-fetch-hook'
import { isEmpty } from 'lodash'

const App = () => {
  const { isLoading, data } = useFetch('/getData')

  useEffect(() => {
    if (!isEmpty(data)) {
      console.log('Data : ', data)
    }
  }, [data])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>A simple React app.....</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form action="../post" method="post" className="form">
          <button type="submit">Connected?</button>
        </form>
      </header>
    </div>
  )
}

export default App
