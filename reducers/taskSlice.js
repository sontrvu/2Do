import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, emptyTasksBoard, addTask, updateTask, deleteTask, setCompletedTask } from '../actions/taskAction';

const initialState = {
  pendingTasks: [],
  completedTasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,

  extraReducers: (builder) => {
    builder

      // fetchTasks
      .addCase(fetchTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        let allTasks = action.payload;

        // Separate pending and completed tasks
        [state.pendingTasks, state.completedTasks] = allTasks.reduce(
          (result, item) => {
            result[item.isCompleted ? 1 : 0].push(item);
            return result;
          },
          [[], []]
        );
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })

      // emptyTasksBoard
      .addCase(emptyTasksBoard.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(emptyTasksBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingTasks = [];
        state.completedTasks = [];
        state.loading = false;
      })
      .addCase(emptyTasksBoard.rejected, (state, action) => {
        state.loading = false;
        state = { ...initialState };
        console.log(action.error.message);
      })

      // addTask
      .addCase(addTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        // Add new task to pending tasks
        let task = action.payload;
        state.pendingTasks.push(task);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })

      // updateTask
      .addCase(updateTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        let updatedTask = action.payload;

        // Find the task id in the pending tasks
        let pendingTaskIndex = state.pendingTasks.findIndex((task) => task.id === updatedTask.id);
        if (pendingTaskIndex !== -1) {
          state.pendingTasks[pendingTaskIndex] = updatedTask;
        }

        // Find the task id in the completed tasks
        let completedTaskIndex = state.completedTasks.findIndex((task) => task.id === updatedTask.id);
        if (completedTaskIndex !== -1) {
          state.completedTasks[completedTaskIndex] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })

      // deleteTask
      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        let deletedTask = action.payload;

        // Find the task id in the pending tasks
        let pendingTaskIndex = state.pendingTasks.findIndex((task) => task.id === deletedTask.id);
        if (pendingTaskIndex !== -1) {
          state.pendingTasks.splice(pendingTaskIndex, 1);
        }

        // Find the task id in the completed tasks
        let completedTaskIndex = state.completedTasks.findIndex((task) => task.id === deletedTask.id);
        if (completedTaskIndex !== -1) {
          state.completedTasks.splice(completedTaskIndex, 1);
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })

      // setCompletedTask
      .addCase(setCompletedTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setCompletedTask.fulfilled, (state, action) => {
        state.loading = false;
        let updatedTask = action.payload;

        // Find the task id in the pending tasks
        let pendingTaskIndex = state.pendingTasks.findIndex((task) => task.id === updatedTask.id);
        if (pendingTaskIndex !== -1 && updatedTask.isCompleted) {
          state.pendingTasks.splice(pendingTaskIndex, 1);
          state.completedTasks.push(updatedTask);
        }

        // Find the task id in the completed tasks
        let completedTaskIndex = state.completedTasks.findIndex((task) => task.id === updatedTask.id);
        if (completedTaskIndex !== -1 && !updatedTask.isCompleted) {
          state.completedTasks.splice(completedTaskIndex, 1);
          state.pendingTasks.push(updatedTask);
        }
      })
      .addCase(setCompletedTask.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });
  },
});

export default taskSlice.reducer;
