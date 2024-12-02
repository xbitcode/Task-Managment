import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  Box,
  TextField,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { format } from 'date-fns'

const Task = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const handleSave = () => {
    onUpdate({ ...task, title: editedTitle })
    setIsEditing(false)
  }

  const handleToggleComplete = () => {
    onUpdate({ ...task, completed: !task.completed })
  }

  const handleDelete = () => {
    onUpdate({ ...task, deleted: true })
  }

  return (
    <Card sx={{ mb: 2, backgroundColor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            color="primary"
          />
          {isEditing ? (
            <TextField
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              size="small"
              autoFocus
            />
          ) : (
            <Typography
              sx={{
                flexGrow: 1,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
              }}
            >
              {task.title}
            </Typography>
          )}
          <Box>
            {isEditing ? (
              <>
                <IconButton size="small" onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    setIsEditing(false)
                    setEditedTitle(task.title)
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="small"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ pl: 4 }}
        >
          Created {format(new Date(task.createdAt), 'PPp')}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Task
