import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fbAuth, fbFirestore } from '../app/firebase';

const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  let allTasks = [];

  try {
    const jsonValue = await AsyncStorage.getItem('@allTasks');
    allTasks = jsonValue != null ? JSON.parse(jsonValue) : tasks;
  } catch (e) {
    console.log(e);
  }

  return allTasks;
});

const addTask = createAsyncThunk('tasks/addTask', async (content, thunkAPI) => {
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

const updateTask = createAsyncThunk('tasks/updateTask', async (task, thunkAPI) => {
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

const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, thunkAPI) => {
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

const setCompletedTask = createAsyncThunk('tasks/setCompletedTask', async (task, thunkAPI) => {
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

export { fetchTasks, addTask, updateTask, deleteTask, setCompletedTask };
