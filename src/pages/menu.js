import React from 'react'
import { Divider, Stack } from '@mui/material'
import Assets from '../assets'
import { MenuItem } from '../components'

const Menu = props => {
  return (
    <Stack
      sx={{
        width: `calc(${window.screen.width}px)`,
        alignItems: 'center',
      }}
      spacing={4}
    >
      <Stack>
        <img
          src={Assets.Menu}
          alt={props.name}
          loading="lazy"
          style={{
            width: '450px',
            alignSelf: 'center',
            paddingLeft: 50,
          }}
        />
        <Divider
          sx={{
            background: 'white',
            width: '25%',
            alignSelf: 'center',
            padding: 0.2,
            borderRadius: 10,
          }}
        />
      </Stack>
      <Stack
        spacing={4}
        style={{
          maxHeight: 600,
          overflow: 'auto',
          border: '2px solid white',
          borderRadius: 10,
          padding: 40,
        }}
      >
        {[
          {
            id: 1,
            imageUrl:
              'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
            name: 'Fruity Pancake',
            quantity: 2,
            additional_info: 'without syrup',
            price: '$12',
          },
          {
            id: 2,
            imageUrl:
              'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
            name: 'Rice with wok vegetables',
            quantity: 3,
            additional_info: 'with teriyaki sauce',
            price: '$15',
          },
          {
            id: 3,
            imageUrl:
              'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
            name: 'Spring Salad',
            quantity: 1,
            price: '$14',
          },
          {
            id: 4,
            imageUrl:
              'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
            name: 'Fruity Pancake',
            quantity: 2,
            additional_info: 'without syrup',
            price: '$12',
          },
          {
            id: 4,
            imageUrl:
              'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
            name: 'Fruity Pancake',
            quantity: 2,
            additional_info: 'without syrup',
            price: '$12',
          },
          {
            id: 4,
            imageUrl:
              'https://tse4.mm.bing.net/th?id=OIP.kTvs-fiEdCw7rldk41rhKwHaEo&pid=Api&P=0',
            name: 'Fruity Pancake',
            quantity: 2,
            additional_info: 'without syrup',
            price: '$12',
          },
        ].map((item, index) => {
          return <MenuItem {...item} key={index} />
        })}
      </Stack>
    </Stack>
  )
}

export default Menu
