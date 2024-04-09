import { createSlice } from '@reduxjs/toolkit';
import { getUnfinishedTasks } from './tasksThunks';
import defaultErrors from '../../errors';
import errors from './errors';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const finishedTasksSlice = createSlice({
  name: 'unfinishedTasks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUnfinishedTasks.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUnfinishedTasks.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(getUnfinishedTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload ? action.payload.map((list) => ({ ...list })) : [];
    });
  }
});

export default finishedTasksSlice.reducer;
