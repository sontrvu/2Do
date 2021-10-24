import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../reducers/taskSlice';

export default configureStore({
  reducer: {
    task: taskReducer,
  },
});
