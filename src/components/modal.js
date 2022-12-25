import React, { useEffect, useState } from 'react'
import {
  Modal as MuiModal,
  Typography,
  TextField,
  Stack,
  Button,
} from '@mui/material'
import { withStyles } from '@mui/styles'

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
    name: '',
    price: '',
    modal: '',
    previewImage: '',
  })
  const [errors, setErrors] = useState({})

  const [type, setType] = useState({
    modal: 'file',
    previewImage: '',
  })

  const validate = () => {
    let temp = {}
    temp.name = values.name ? '' : 'This field is Required.'
    temp.price = values.price ? '' : 'This field is Required.'
    temp.modal = values.modal ? '' : 'This field is Required.'
    temp.previewImage = values.previewImage ? '' : 'This field is Required.'
    setErrors({
      ...temp,
    })

    return Object.values(temp).every(x => x == '')
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('validate : ', validate(), values)
    // if (validate()) {
    //   window.alert('submitted!!')
    // } else {
    //   window.alert('falied!!')
    // }
  }

  return (
    <MuiModal
      keepMounted
      //   open={true}
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
        <form action="/" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <TextField
              id="outlined-name"
              label="Name"
              variant="outlined"
              fullWidth
              value={values.name}
              onChange={ev => setValues({ ...values, name: ev.target.value })}
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name : ''}
              required
              autoComplete="off"
            />
            <TextField
              id="outlined-price"
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={values.price}
              onChange={ev => setValues({ ...values, price: ev.target.value })}
              error={errors.price ? true : false}
              helperText={errors.price ? errors.price : ''}
              required
            />
            <CssTextField
              label="3d Modal"
              name="username"
              variant="outlined"
              type="file"
              onChange={ev => setValues({ ...values, modal: ev.target.value })}
              error={errors.modal ? true : false}
              helperText={errors.modal ? errors.modal : ''}
              required
              focused
            />
            <CssTextField
              label="Preview Image"
              name="username"
              variant="outlined"
              type="file"
              focused
              onChange={ev =>
                setValues({ ...values, previewImage: ev.target.value })
              }
              error={errors.previewImage ? true : false}
              helperText={errors.previewImage ? errors.previewImage : ''}
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
