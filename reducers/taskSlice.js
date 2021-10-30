import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, updateTask, deleteTask, setCompletedTask } from '../actions/taskAction';

const taskSlice = createSlice({
  name: 'task',

  initialState: {
    pendingTasks: [],
    completedTasks: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        let allTasks = action.payload;
        [state.pendingTasks, state.completedTasks] = allTasks.reduce(
          (result, item) => {
            result[item.isCompleted ? 1 : 0].push(item);
            return result;
          },
          [[], []]
        );
      })

      .addCase(addTask.fulfilled, (state, action) => {
        let allTasks = action.payload;
        [state.pendingTasks, state.completedTasks] = allTasks.reduce(
          (result, item) => {
            result[item.isCompleted ? 1 : 0].push(item);
            return result;
          },
          [[], []]
        );
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        let allTasks = action.payload;
        [state.pendingTasks, state.completedTasks] = allTasks.reduce(
          (result, item) => {
            result[item.isCompleted ? 1 : 0].push(item);
            return result;
          },
          [[], []]
        );
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        let allTasks = action.payload;
        [state.pendingTasks, state.completedTasks] = allTasks.reduce(
          (result, item) => {
            result[item.isCompleted ? 1 : 0].push(item);
            return result;
          },
          [[], []]
        );
      })

      .addCase(setCompletedTask.fulfilled, (state, action) => {
        let allTasks = action.payload;
        [state.pendingTasks, state.completedTasks] = allTasks.reduce(
          (result, item) => {
            result[item.isCompleted ? 1 : 0].push(item);
            return result;
          },
          [[], []]
        );
      });
  },
});

export default taskSlice.reducer;
