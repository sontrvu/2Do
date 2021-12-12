import { createAsyncThunk } from '@reduxjs/toolkit';
import { fbAuth, fbFirestore } from '../app/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLoggedInUser = createAsyncThunk('user/getLoggedInUser', async () => {
  const user = await AsyncStorage.getItem('LOGGED_IN_USER');
  const payload = JSON.parse(user) || {};

  return payload;
});

const loginWithUser = createAsyncThunk('user/loginWithUser', async (data, thunkAPI) => {
  // Authenticate user with firebase auth
  await fbAuth.signInWithEmailAndPassword(data.email, data.password);
  const payload = { uid: fbAuth.currentUser.uid };

  // Save serialized user object to AsyncStorage
  const jsonValue = JSON.stringify(payload);
  await AsyncStorage.setItem('LOGGED_IN_USER', jsonValue);

  return payload;
});

const registerUser = createAsyncThunk('user/registerUser', async (data, thunkAPI) => {
  // Sign up the user with email and password
  await fbAuth.createUserWithEmailAndPassword(data.email, data.password);

  // Add the user to the Firestore database
  await fbFirestore.collection('users').doc(fbAuth.currentUser.uid).set({
    tasks: [],
    email: data.email,
    fullName: data.fullName,
  });

  const payload = { uid: fbAuth.currentUser.uid };

  // Save serialized user object to AsyncStorage
  const jsonValue = JSON.stringify(payload);
  await AsyncStorage.setItem('LOGGED_IN_USER', jsonValue);

  return payload;
});

const logoutUser = createAsyncThunk('user/logoutUser', async (data, thunkAPI) => {
  await fbAuth.signOut();

  // Remove the user from AsyncStorage
  await AsyncStorage.removeItem('LOGGED_IN_USER');

  return {};
});

export { getLoggedInUser, loginWithUser, registerUser, logoutUser };
