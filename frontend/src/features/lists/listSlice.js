import { createSlice } from '@reduxjs/toolkit';
import { addList, deleteList, updateList } from './listsThunks';
import defaultErrors from '../../errors';
import errors from './errors';

const initialState = {
  loading: false,
  error: null,
  selectedList: null
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    selectList: (state, action) => {
      state.selectedList = { ...action.payload };
    },
    resetError: (state, action) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addList.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addList.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteList.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteList.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateList.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateList.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      state.loading = false;
    });
  }
});

export const { selectList, resetError } = listSlice.actions;

export default listSlice.reducer;
