import { createSlice } from '@reduxjs/toolkit';
import { check, login, logout } from './authThunks';
import defaultErrors from '../../errors';
import errors from './errors';

const initialState = {
  loading: false,
  error: null,
  checkError: null,
  authChecked: false,
  isLoggedIn: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(check.pending, (state, action) => {
      state.loading = true;
      state.checkError = null;
    });
    builder.addCase(check.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.checkError =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
      state.authChecked = true;
    });
    builder.addCase(check.fulfilled, (state, action) => {
      state.loading = false;
      state.authChecked = true;

      if (action.payload) {
        state.isLoggedIn = true;
        state.user = { ...action.payload };
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.isLoggedIn = true;
        state.user = { ...action.payload };
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    });
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
    });
  }
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
