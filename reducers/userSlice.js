import { createSlice } from '@reduxjs/toolkit';
import { getLoggedInUser, loginWithUser, registerUser, logoutUser } from '../actions/userAction';

const initialState = {
  user: {},
  loading: false,
  error: false,
  errorMessage: '',
  requestId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,

  extraReducers: (builder) => {
    builder

      // getLoggedInUser
      .addCase(getLoggedInUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.requestId = action.meta.requestId;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = false;
        state.user = action.payload;

        console.log(action.payload);
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;

        console.log(action.error.message);
      })

      // loginWithUser
      .addCase(loginWithUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.requestId = action.meta.requestId;
      })
      .addCase(loginWithUser.fulfilled, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = false;
        state.user = action.payload;

        console.log(action.payload);
      })
      .addCase(loginWithUser.rejected, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;

        console.log(action.error.message);
      })

      // registerUser
      .addCase(registerUser.pending, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = true;
        state.error = false;
        state.errorMessage = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = false;
        state.user = action.payload;

        console.log(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;

        console.log(action.error.message);
      })

      // logoutUser
      .addCase(logoutUser.pending, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = true;
        state.error = false;
        state.errorMessage = '';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = false;
        state.user = initialState.user;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.requestId = action.meta.requestId;
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;

        console.log(action.error.message);
      });
  },
});

export default userSlice.reducer;
