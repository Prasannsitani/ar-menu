import React, { useEffect, useMemo, useState } from 'react'
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
import CancelIcon from '@mui/icons-material/Cancel'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
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
  borderRadius: 10,
}

const SectionModal = props => {
  const sections = useMemo(() => {
    return props.sections ? props.sections : []
  }, [props.sections])

  const [name, setName] = useState('')

  const [isLoading, setIsLoading] = useState('')

  const handleAddSection = () => {
    fetch(`${process.env.REACT_APP_API_URL}/add-section`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then(response => response)
      .then(async response => {
        const data = await response.json()
        if (response.status === 200) {
          window.location.reload()
        } else if (response.status === 400 && !isEmpty(data)) {
          props.onOpenToast(data?.message)
        } else {
          props.onOpenToast('Something Went Wrong!!')
        }
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        props.onOpenToast('Something Went Wrong!!')
      })
  }

  const handleDelete = props => {
    console.log('Delete Index : ', props.id)
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
        <Stack spacing={2}>
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
              Sections List
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

          <List sx={{ maxHeight: '200px', overflow: 'auto' }}>
            {sections.map(item => {
              return (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete({ id: item.id })}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              )
            })}
          </List>
          <TextField
            name="name"
            type="text"
            value={name}
            label="New Section"
            onChange={ev => setName(ev.target.value)}
          />
        </Stack>
        <Stack spacing={4}>
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
              <Typography>Cancel</Typography>
            </Button>
            <CircularProgress color="primary" size="sm" />
            <Button
              sx={{ width: '48%' }}
              variant="contained"
              onClick={handleAddSection}
            >
              <Stack flexDirection="row" alignItems="center">
                {isLoading ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress sx={{ color: 'white' }} size="1rem" />
                  </Box>
                ) : null}
                <Typography sx={{ ml: isLoading ? 1 : 0 }}>Add</Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MuiModal>
  )
}

export default SectionModal
