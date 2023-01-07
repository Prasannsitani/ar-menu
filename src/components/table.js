import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Stack,
  Table as MuiTable,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ImageModal, Modal, ModelModal } from '../components'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import UploadFileIcon from '@mui/icons-material/UploadFile'

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
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
  })

  const [imageModal, setImageModal] = useState({
    id: '',
    imageUrl: '',
    isOpen: false,
  })

  const [modelModal, setModelModal] = useState({
    id: '',
    isModel: false,
    isOpen: false,
  })

  return (
    <Stack
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          width: '90%',
          maxHeight: `calc(${window.screen.height}px - 270px)`,
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
                Is Model
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
                Section
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
                onClick={
                  () => {
                    console.log('item : ', item)
                  }
                  // props.onOpen(item)
                }
              >
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  <>
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
                    <IconButton
                      className="upload"
                      onClick={() =>
                        setImageModal({
                          isOpen: true,
                          imageUrl: item.preview_image,
                          id: item._id,
                        })
                      }
                    >
                      <UploadFileIcon style={{ color: 'gray' }} />
                    </IconButton>
                  </>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Stack
                    sx={{
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <img
                      src={`${
                        item.ar_enabled
                          ? `https://www.shutterstock.com/image-illustration/yes-word-pop-art-retro-260nw-1096973984.jpg`
                          : `https://png.pngtree.com/png-clipart/20200224/original/pngtree-no-speech-bubble-icon-pop-art-style-png-image_5248403.jpg`
                      }?w=100&h=100&fit=crop&auto=format`}
                      alt={'Image'}
                      loading="lazy"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: 10,
                        objectFit: 'cover',
                      }}
                    />
                    <IconButton
                      className="upload"
                      onClick={() =>
                        setModelModal({
                          isOpen: true,
                          isModel: item.ar_enabled,
                          id: item._id,
                        })
                      }
                    >
                      <UploadFileIcon style={{ color: 'gray' }} />
                    </IconButton>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ minWidth: '100px', maxWidth: '150px' }}
                >
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.food_category}
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
        isOpen={props.isOpen?.isOpen}
        data={props.isOpen?.data}
        onClose={props.onClose}
        openToast={message => setToast({ isOpen: true, message: message })}
      />
      <ImageModal
        id={imageModal.id}
        isOpen={imageModal.isOpen}
        imageUrl={imageModal.imageUrl}
        onClose={() => setImageModal({ isOpen: false, imageUrl: '', id: '' })}
        openToast={message => setToast({ isOpen: true, message: message })}
      />
      <ModelModal
        id={modelModal.id}
        isOpen={modelModal.isOpen}
        isModel={modelModal.isModel}
        onClose={() => setModelModal({ isOpen: false, isModel: false, id: '' })}
        openToast={message => setToast({ isOpen: true, message: message })}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={toast.isOpen}
        onClose={() => setToast({ isOpen: false, message: '' })}
        message={toast.message}
        TransitionComponent={props => <Slide {...props} direction="up" />}
      />
    </Stack>
  )
}

export default Table
