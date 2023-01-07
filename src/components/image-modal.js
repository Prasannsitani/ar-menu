import React, { useEffect, useMemo, useState } from 'react'
import {
  Modal as MuiModal,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  Divider,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import { isEmpty } from 'lodash'
import CancelIcon from '@mui/icons-material/Cancel'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'gray',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'lightGray',
        borderWidth: '1px',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'lightGray',
        borderWidth: '1px',
      },
    },
  },
})(TextField)

const ImageModal = props => {
  const imageUrl = useMemo(
    () => (props.imageUrl ? props.imageUrl : ''),
    [props.imageUrl],
  )

  const id = useMemo(() => (props.id ? props.id : ''), [props.id])

  const [currentFile, setCurrentFile] = useState()

  const changeHandler = event => {
    setCurrentFile(event.target.files[0])
  }

  const handleSubmit = e => {
    const formData = new FormData()

    formData.append('id', id)
    formData.append('image', currentFile)

    fetch(`${process.env.REACT_APP_API_URL}/upload-image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then(response => response)
      .then(async response => {
        const data = await response.json()
        if (response.status === 200) {
          window.location.reload()
        } else if (response.status === 400 && !isEmpty(data)) {
          props.openToast(data?.message)
        } else {
          props.openToast('Something Went Wrong!!')
        }
      })
      .catch(error => {
        props.openToast('Something Went Wrong!!')
      })
  }

  return (
    <MuiModal
      keepMounted
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Stack sx={style} spacing={4}>
        <IconButton
          sx={{ position: 'absolute', right: 15 }}
          onClick={() => props.onClose()}
        >
          <CancelIcon />
        </IconButton>

        <Stack w="100%" alignItems="center">
          <Typography
            id="keep-mounted-modal-title"
            variant="h4"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            fontFamily="cursive"
          >
            Preview Image
          </Typography>
          <Divider
            sx={{
              width: '15%',
              alignSelf: 'center',
              color: 'black',
              background: '#000',
            }}
          />
        </Stack>

        <img
          src={`${imageUrl}`}
          srcSet={`${imageUrl}`}
          width="30%"
          style={{ margin: '0 auto', marginTop: '8px' }}
          alt={`image`}
          loading="lazy"
        />

        <TextField
          label="Id"
          name="id"
          type="text"
          value={id}
          sx={{ display: 'none' }}
        />
        <Stack spacing={4}>
          <CssTextField
            label="Preview Image"
            name="image"
            variant="outlined"
            type="file"
            focused
            required
            onChange={changeHandler}
          />
          <Stack
            sx={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Button
              sx={{ width: '48%' }}
              color="error"
              variant="outlined"
              onClick={props.onClose}
            >
              Cancel
            </Button>

            <Button
              sx={{ width: '48%' }}
              variant="contained"
              onClick={handleSubmit}
            >
              Upload
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MuiModal>
  )
}

export default ImageModal
