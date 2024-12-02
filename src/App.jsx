import { useState } from 'react'
import { ThemeProvider, CssBaseline, Container, Typography, Box } from '@mui/material'
import { theme } from './theme'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks])
  }

  const handleTaskUpdate = (updatedTask) => {
    if (updatedTask.deleted) {
      setTasks(tasks.filter(task => task.id !== updatedTask.id))
    } else {
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ))
    }
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTasks(items)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Task Manager
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Organize your tasks efficiently
          </Typography>
        </Box>
        
        <AddTask onAdd={handleAddTask} />
        <TaskList 
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onDragEnd={handleDragEnd}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
