import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Stack, Table as MuiTable } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Modal } from '../components'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const Table = props => {
  console.log('props : ', props)

  const [isOpen, setIsOpen] = useState({ isOpen: false, data: {} })

  const [toastIsOpen, setToastIsOpen] = useState(false)

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: '60%',
          maxHeight: 700,
        }}
      >
        <MuiTable aria-label="customized table" stickyHeader>
          <TableHead sx={{ width: '100%' }}>
            <TableRow>
              <StyledTableCell align="center">Sr. No</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Price&nbsp;(Rs.)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((item, index) => (
              <StyledTableRow
                key={index}
                onClick={() => {
                  setIsOpen({ isOpen: true, data: item })
                }}
              >
                <StyledTableCell align="center">{index}</StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={`${item.preview_image}?w=100&h=100&fit=crop&auto=format`}
                    srcSet={`${item.preview_image}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                    alt={'Image'}
                    loading="lazy"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: 10,
                      objectFit: 'cover',
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">{item.section}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.price.displayText}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Modal
        isOpen={isOpen?.isOpen}
        data={isOpen?.data}
        onClose={() => setIsOpen({ isOpen: false, data: {} })}
        openToast={() => setToastIsOpen(true)}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={toastIsOpen}
        onClose={() => setToastIsOpen(false)}
        message="I love snacks"
        TransitionComponent={props => <Slide {...props} direction="up" />}
      />
    </>
  )
}

export default Table
