import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Stack, Table as MuiTable, Button } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Modal } from '../components'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import AddCircleIcon from '@mui/icons-material/AddCircle'

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

const Table = props => {
  const [isOpen, setIsOpen] = useState({ isOpen: false, data: {} })

  const [toastIsOpen, setToastIsOpen] = useState(false)

  return (
    <Stack
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
      spacing={4}
    >
      <Stack sx={{ width: '80%', position: 'absolute', top: 170 }}>
        <Button
          sx={{ alignSelf: 'flex-end' }}
          variant="contained"
          endIcon={<AddCircleIcon color="white" />}
          onClick={() => setIsOpen({ isOpen: true, data: {} })}
        >
          Add Item
        </Button>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{
          width: '80%',
          maxHeight: 720,
        }}
      >
        <MuiTable aria-label="customized table" stickyHeader>
          <TableHead sx={{ width: '100%' }}>
            <TableRow sx={{ fontWeight: 'bold' }}>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                Sr. No
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                Image
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                Name
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                Description
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                Category
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                Price&nbsp;(Rs.)
              </StyledTableCell>
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
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
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
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: '100px', maxWidth: '150px' }}
                >
                  {item.description}
                </StyledTableCell>
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
        color="success"
        message="Submitted Successfully!!"
        TransitionComponent={props => <Slide {...props} direction="up" />}
      />
    </Stack>
  )
}

export default Table
