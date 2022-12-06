import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import useFetch from 'react-fetch-hook'
import { isEmpty } from 'lodash'

const App = () => {
  const { isLoading, data, error } = useFetch('/get-orders', {
    formatter: response => response.json(),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div> {error.status} </div>

  return isEmpty(data) ? (
    <div> No Data Found </div>
  ) : (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>Menu App</h1>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: window.innerWidth / 6,
                background: 'white',
                boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
                padding: '1em',
                borderRadius: 15,
                marginBottom: 20,
                color: 'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  placeItems: 2,
                }}
              >
                <p style={{ fontSize: '16px' }}>{`${item.ordered_table}`}</p>
                <p
                  style={{ fontSize: '16px', color: 'gray' }}
                >{`As soon as`}</p>
              </div>
              <div
                style={{
                  alignSelf: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    fontWeight: 'bolder',
                    fontFamily: 'sans-serif',
                  }}
                >{`${item.total_amount.displayText}`}</p>
              </div>
            </div>
          )
        })}
      </header>
    </div>
  )
}

export default App
