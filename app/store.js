import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskSlice from '../reducers/taskSlice';
import userSlice from '../reducers/userSlice';

const rootReducer = combineReducers({
  task: taskSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
