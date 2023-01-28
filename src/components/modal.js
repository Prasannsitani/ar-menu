import React, { useEffect, useState } from 'react'
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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
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

const Modal = props => {
  const [currentFile, setCurrentFile] = useState()

  const [uploadLoading, setUploadLoading] = useState(false)

  const [deleteLoading, setDeleteLoading] = useState(false)

  const [values, setValues] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    section: '',
    price: '',
  })

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setValues({
        id: props.data?._id,
        name: props.data?.name,
        description: props.data?.description,
        category: props.data?.food_category,
        section: props.data?.section,
        price: props.data?.price?.value,
      })
    }

    return () => {
      setValues({
        id: '',
        name: '',
        description: '',
        category: '',
        section: '',
        price: '',
      })
      setCurrentFile()
    }
  }, [props.data])

  const handleDelete = () => {
    setDeleteLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}/menu-item/del`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: values.id,
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
      .catch(err => {
        setDeleteLoading(false)
        props.openToast('Something Went Wrong!!')
      })
  }

  const changeHandler = event => {
    setCurrentFile(event.target.files[0])
  }

  const handleSubmit = () => {
    setUploadLoading(true)
    const formData = new FormData()

    formData.append('id', values.id)
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('category', values.category)
    formData.append('section', values.section)
    formData.append('price', values.price)

    if (props.showImage) {
      formData.append('image', currentFile)
    }

    fetch(`${process.env.REACT_APP_API_URL}/update-menu`, {
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
        setUploadLoading(false)
      })
      .catch(error => {
        setUploadLoading(false)
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
            Details
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

        <TextField
          label="Id"
          name="id"
          type="text"
          value={values.id}
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
            focused={values.name ? true : false}
            autoFocus={true}
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
            focused={values.description ? true : false}
          />
          <FormControl fullWidth focused={values.category ? true : false}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="Category"
              name="category"
              value={values.category}
              label="Category"
              onChange={ev =>
                setValues({ ...values, category: ev.target.value })
              }
            >
              <MenuItem value={`veg`}>Veg</MenuItem>
              <MenuItem value={`non_veg`}>Non Veg</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth focused={values.section ? true : false}>
            <InputLabel id="category-label">Section</InputLabel>
            <Select
              labelId="section-label"
              name="section"
              value={values.section}
              label="Section"
              onChange={ev =>
                setValues({ ...values, section: ev.target.value })
              }
            >
              {props.sections.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={`${item.name}`}
                  >{`${item.name}`}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

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
            focused={values.price ? true : false}
          />

          {props.showImage ? (
            <CssTextField
              label="Preview Image"
              name="image"
              variant="outlined"
              type="file"
              focused
              required
              onChange={changeHandler}
            />
          ) : null}
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
              onClick={handleDelete}
            >
              <Stack flexDirection="row" alignItems="center">
                {deleteLoading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress sx={{ color: 'red' }} size="1rem" />
                  </Box>
                ) : null}
                <Typography sx={{ ml: deleteLoading ? 1 : 0 }}>
                  {`DELETE`}
                </Typography>
              </Stack>
            </Button>

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
                <Typography sx={{ ml: uploadLoading ? 1 : 0 }}>SAVE</Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MuiModal>
  )
}

export default Modal
