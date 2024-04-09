import { createSlice } from '@reduxjs/toolkit';
import { register } from './authThunks';
import errors from '../../errors';

const initialState = {
  loading: false,
  error: null
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = errors[action.payload.errorCode] || errors.server_error;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
    });
  }
});

export const { resetError } = registrationSlice.actions;

export default registrationSlice.reducer;
