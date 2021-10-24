import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  let allTasks = [];

  try {
    const jsonValue = await AsyncStorage.getItem('@allTasks');
    allTasks = jsonValue != null ? JSON.parse(jsonValue) : tasks;
  } catch (e) {
    console.log(e);
  }

  return allTasks;
});

export const addTask = createAsyncThunk('tasks/addTask', async (content, thunkAPI) => {
  let allTasks = [];
  let newTask = {
    id: Math.random(),
    name: content,
    isCompleted: false,
  };

  try {
    const jsonValue = await AsyncStorage.getItem('@allTasks');

    allTasks = jsonValue != null ? JSON.parse(jsonValue) : [];
    allTasks.push(newTask);

    await AsyncStorage.setItem('@allTasks', JSON.stringify(allTasks));
  } catch (e) {
    console.log(e);
  }

  return allTasks;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task, thunkAPI) => {
  let allTasks = [];

  try {
    const jsonValue = await AsyncStorage.getItem('@allTasks');
    allTasks = jsonValue != null ? JSON.parse(jsonValue) : [];

    let idx = allTasks.findIndex((obj) => obj.id == task.id);
    if (idx != -1) {
      allTasks[idx].name = task.name;
    }

    await AsyncStorage.setItem('@allTasks', JSON.stringify(allTasks));
  } catch (e) {
    console.log(e);
  }

  return allTasks;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, thunkAPI) => {
  let allTasks = [];

  try {
    const jsonValue = await AsyncStorage.getItem('@allTasks');
    allTasks = jsonValue != null ? JSON.parse(jsonValue) : [];

    let idx = allTasks.findIndex((obj) => obj.id == taskId);
    if (idx != -1) {
      allTasks.splice(idx, 1);
    }

    await AsyncStorage.setItem('@allTasks', JSON.stringify(allTasks));
  } catch (e) {
    console.log(e);
  }

  return allTasks;
});

export const setCompletedTask = createAsyncThunk('tasks/setCompletedTask', async (task, thunkAPI) => {
  let allTasks = [];

  try {
    const jsonValue = await AsyncStorage.getItem('@allTasks');
    allTasks = jsonValue != null ? JSON.parse(jsonValue) : [];

    let idx = allTasks.findIndex((obj) => obj.id == task.id);
    if (idx != -1) {
      allTasks[idx].isCompleted = task.isCompleted;
    }

    await AsyncStorage.setItem('@allTasks', JSON.stringify(allTasks));
  } catch (e) {
    console.log(e);
  }

  return allTasks;
});

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
