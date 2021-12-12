import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase, { fbFirestore } from '../app/firebase';

const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (data, thunkAPI) => {
  let tasks = [];
  let userDoc = await fbFirestore.collection('users').doc(data.uid).get();
  let taskIds = userDoc.data().tasks || [];

  if (taskIds.length > 0) {
    // Get all tasks from user's task list
    let taskDocs = await fbFirestore
      .collection('tasks')
      .where(firebase.firestore.FieldPath.documentId(), 'in', taskIds)
      .get();

    tasks = taskDocs.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  return tasks;
});

const emptyTasksBoard = createAsyncThunk('tasks/emptyTasksBoard', async (data, thunkAPI) => {
  // ??
  return {};
});

const addTask = createAsyncThunk('tasks/addTask', async (data, thunkAPI) => {
  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // await sleep(10000);
  // throw new Error('Error adding task');

  let task = {
    name: data.taskContent,
    content: data.taskContent,
    isCompleted: false,
  };

  // Add new task to tasks collection
  let response = await fbFirestore.collection('tasks').add(task);

  // Add new task ID to user's task list
  await fbFirestore
    .collection('users')
    .doc(data.uid)
    .update({
      tasks: firebase.firestore.FieldValue.arrayUnion(response.id),
    });

  let payload = { id: response.id, ...task };
  return payload;
});

const updateTask = createAsyncThunk('tasks/updateTask', async (data, thunkAPI) => {
  await fbFirestore.collection('tasks').doc(data.task.id).update({
    name: data.task.name,
    isCompleted: data.task.isCompleted,
  });

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // await sleep(2000);

  return data.task;
});

const deleteTask = createAsyncThunk('tasks/deleteTask', async (data, thunkAPI) => {
  // Delete task from tasks collection
  await fbFirestore.collection('tasks').doc(data.task.id).delete();

  // Delete task ID from user's task list
  await fbFirestore
    .collection('users')
    .doc(data.uid)
    .update({
      tasks: firebase.firestore.FieldValue.arrayRemove(data.task.id),
    });

  let payload = { id: data.task.id };
  return payload;
});

const setCompletedTask = createAsyncThunk('tasks/setCompletedTask', async (data, thunkAPI) => {
  await fbFirestore.collection('tasks').doc(data.task.id).update({
    name: data.task.name,
    isCompleted: data.task.isCompleted,
  });

  return data.task;
});

export { fetchTasks, emptyTasksBoard, addTask, updateTask, deleteTask, setCompletedTask };
