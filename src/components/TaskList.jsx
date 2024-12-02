import { Box, Typography, Paper } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Task from './Task'

const TaskList = ({ tasks, onTaskUpdate, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ width: '100%', minHeight: '100px' }}
          >
            {tasks.length === 0 ? (
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: 'background.paper',
                }}
              >
                <Typography color="textSecondary">
                  No tasks yet. Add a new task to get started!
                </Typography>
              </Paper>
            ) : (
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task task={task} onUpdate={onTaskUpdate} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TaskList
