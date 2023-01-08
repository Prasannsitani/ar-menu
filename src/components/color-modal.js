import React, { useEffect, useState } from 'react'
import {
  Modal as MuiModal,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  Divider,
} from '@mui/material'
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

const ColorModal = props => {
  console.log('props : ', props)

  const [values, setValues] = useState({
    name: '',
    primaryColor: '',
    primaryTextColor: '',
    secondaryColor: '',
    secondaryTextColor: '',
  })

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setValues({
        name: props.data?.name,
        primaryColor: props.data?.theme?.primary_color,
        primaryTextColor: props.data?.theme?.primary_text_color,
        secondaryColor: props.data?.theme?.secondary_color,
        secondaryTextColor: props.data?.theme?.secondary_text_color,
      })
    }

    return () =>
      setValues({
        name: '',
        primaryColor: '',
        primaryTextColor: '',
        secondaryColor: '',
        secondaryTextColor: '',
      })
  }, [props.data])

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/update-info`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        primaryColor: values.primaryColor,
        primaryTextColor: values.primaryTextColor,
        secondaryColor: values.secondaryColor,
        secondaryTextColor: values.secondaryTextColor,
      }),
    })
      .then(response => response)
      .then(async response => {
        const data = await response.json()
        if (response.status === 200) {
          window.location.reload()
        } else if ((response.status === 400, !isEmpty(data))) {
          props.onOpenToast(data?.message)
        } else {
          props.onOpenToast('Something Went Wrong!!')
        }
      })
      .catch(error => props.onOpenToast('Something Went Wrong!!'))
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
            Ui Pallete
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

        <Stack spacing={4}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            value={values.name}
            onChange={ev => setValues({ ...values, name: ev.target.value })}
            autoComplete="off"
            focused={values.name ? true : false}
            autoFocus={true}
            required
          />
          <TextField
            label="Primary Color"
            name="primaryColor"
            variant="outlined"
            fullWidth
            value={values.primaryColor}
            onChange={ev =>
              setValues({ ...values, primaryColor: ev.target.value })
            }
            required
            autoComplete="off"
            focused={values.primaryColor ? true : false}
          />
          <TextField
            label="Primary Text Color"
            name="primaryTextColor"
            variant="outlined"
            fullWidth
            value={values.primaryTextColor}
            onChange={ev =>
              setValues({ ...values, primaryTextColor: ev.target.value })
            }
            required
            autoComplete="off"
            focused={values.primaryTextColor ? true : false}
          />
          <TextField
            label="Secondary Color"
            name="secondaryColor"
            variant="outlined"
            fullWidth
            value={values.secondaryColor}
            onChange={ev =>
              setValues({ ...values, secondaryColor: ev.target.value })
            }
            required
            autoComplete="off"
            focused={values.secondaryColor ? true : false}
          />
          <TextField
            label="Secondary Text Color"
            name="secondaryTextColor"
            variant="outlined"
            fullWidth
            value={values.secondaryTextColor}
            onChange={ev =>
              setValues({ ...values, secondaryTextColor: ev.target.value })
            }
            autoComplete="off"
            required
            focused={values.secondaryTextColor ? true : false}
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
              SAVE
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MuiModal>
  )
}

export default ColorModal
