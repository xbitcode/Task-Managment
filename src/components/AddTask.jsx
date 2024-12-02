import { useState } from 'react'
import {
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd({
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      })
      setTitle('')
    }
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!title.trim()}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default AddTask
