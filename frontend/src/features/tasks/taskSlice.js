import { createSlice } from '@reduxjs/toolkit';
import { updateTask, addTask, deleteTask } from './tasksThunks';
import defaultErrors from '../../errors';
import errors from './errors';

const initialState = {
  loading: false,
  error: null,
  selectedTask: null
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = { ...action.payload };
    },
    resetError: (state, action) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateTask.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addTask.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
    });
  }
});

export const { selectTask, resetError } = taskSlice.actions;

export default taskSlice.reducer;
