import { createSlice } from '@reduxjs/toolkit';
import { getFinishedTasks } from './tasksThunks';
import defaultErrors from '../../errors';
import errors from './errors';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const finishedTasksSlice = createSlice({
  name: 'finishedTasks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFinishedTasks.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFinishedTasks.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(getFinishedTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload ? action.payload.map((list) => ({ ...list })) : [];
    });
  }
});

export default finishedTasksSlice.reducer;
