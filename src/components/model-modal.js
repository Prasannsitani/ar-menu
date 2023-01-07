import React, { useMemo, useState } from 'react'
import {
  Modal as MuiModal,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  Divider,
  Box,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import { isEmpty } from 'lodash'
import CancelIcon from '@mui/icons-material/Cancel'
import CircularProgress from '@mui/material/CircularProgress'

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

const ModelModal = props => {
  const modelUrl = useMemo(
    () =>
      props.isModel
        ? 'https://www.shutterstock.com/image-illustration/yes-word-pop-art-retro-260nw-1096973984.jpg'
        : 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-no-speech-bubble-icon-pop-art-style-png-image_5248403.jpg',
    [props.isModel],
  )

  const id = useMemo(() => (props.id ? props.id : ''), [props.id])

  const [uploadLoading, setUploadLoading] = useState(false)

  const [deleteLoading, setDeleteLoading] = useState(false)

  const [currentFile, setCurrentFile] = useState()

  const changeHandler = event => {
    setCurrentFile(event.target.files[0])
  }

  const handleSubmit = e => {
    setUploadLoading(true)
    const formData = new FormData()

    formData.append('id', id)
    formData.append('model', currentFile)

    fetch(`${process.env.REACT_APP_API_URL}/upload-model`, {
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
          console.log('else')
          props.openToast('Something Went Wrong!!')
        }
        setUploadLoading(false)
      })
      .catch(error => {
        setUploadLoading(false)
        props.openToast('Something Went Wrong!!')
      })
  }

  const handleDelete = ev => {
    setDeleteLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}/delete-model`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
      }),
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
        setDeleteLoading(false)
      })
      .catch(error => {
        setDeleteLoading(false)
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
            3D Model
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
          src={`${modelUrl}`}
          srcSet={`${modelUrl}`}
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
            label="3D Model"
            name="model"
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
              onClick={() => (props.isModel ? handleDelete() : props.onClose())}
            >
              <Stack flexDirection="row" alignItems="center">
                {deleteLoading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress sx={{ color: 'red' }} size="1rem" />
                  </Box>
                ) : null}
                <Typography sx={{ ml: deleteLoading ? 1 : 0 }}>
                  {props.isModel ? `DELETE` : `CANCEL`}
                </Typography>
              </Stack>
            </Button>
            <CircularProgress color="primary" size="sm" />
            <Button
              sx={{ width: '48%' }}
              variant="contained"
              onClick={handleSubmit}
            >
              <Stack flexDirection="row" alignItems="center">
                {uploadLoading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress sx={{ color: 'white' }} size="1rem" />
                  </Box>
                ) : null}
                <Typography sx={{ ml: uploadLoading ? 1 : 0 }}>
                  Upload
                </Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MuiModal>
  )
}

export default ModelModal
