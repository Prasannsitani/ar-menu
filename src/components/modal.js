import React, { useEffect, useState } from 'react'
import {
  Modal as MuiModal,
  Typography,
  TextField,
  Stack,
  Button,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import { isEmpty } from 'lodash'

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

const Modal = props => {
  const [values, setValues] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    price: '',
  })

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setValues({
        id: props.data?._id,
        name: props.data?.name,
        description: props.data?.description,
        category: props.data?.section,
        price: props.data?.price?.value,
      })
    }
  }, [props.data])

  const handleSubmit = e => {
    // e.preventDefault()
    props.openToast()
    props.onClose()
    // setValues({
    //   id: '',
    //   name: '',
    //   description: '',
    //   category: '',
    //   price: '',
    // })
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
        <Typography
          id="keep-mounted-modal-title"
          variant="h4"
          component="h2"
          textAlign="center"
          fontWeight="bold"
        >
          Details
        </Typography>
        <form
          action="/update-menu"
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Id"
            name="id"
            type="text"
            value={values.id}
            onChange={ev => setValues({ ...values, name: ev.target.value })}
            sx={{ display: 'none' }}
          />
          <Stack spacing={4}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={values.name}
              onChange={ev => setValues({ ...values, name: ev.target.value })}
              required
              autoComplete="off"
              focused
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              value={values.description}
              onChange={ev =>
                setValues({ ...values, description: ev.target.value })
              }
              required
              autoComplete="off"
              focused
            />
            <TextField
              label="Category"
              name="category"
              variant="outlined"
              fullWidth
              value={values.category}
              onChange={ev =>
                setValues({ ...values, category: ev.target.value })
              }
              required
              autoComplete="off"
              focused
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              fullWidth
              value={values.price}
              onChange={ev => setValues({ ...values, price: ev.target.value })}
              autoComplete="off"
              required
              focused
            />

            <CssTextField
              label="3d Modal"
              name="files"
              variant="outlined"
              type="file"
              onChange={ev => setValues({ ...values, model: ev.target.value })}
              required
              focused
            />

            <CssTextField
              label="Preview Image"
              name="files"
              variant="outlined"
              type="file"
              focused
              onChange={ev =>
                setValues({ ...values, previewImage: ev.target.value })
              }
              required
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
                variant="outlined"
                onClick={props.onClose}
              >
                Cancel
              </Button>
              <Button sx={{ width: '48%' }} variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </MuiModal>
  )
}

export default Modal
