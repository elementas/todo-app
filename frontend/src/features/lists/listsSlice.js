import { createSlice } from '@reduxjs/toolkit';
import { getLists } from './listsThunks';
import defaultErrors from '../../errors';
import errors from './errors';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLists.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLists.rejected, (state, action) => {
      state.loading = false;
      state.error =
        errors[action.payload.errorCode] || defaultErrors[action.payload.errorCode] || defaultErrors.server_error;
    });
    builder.addCase(getLists.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload ? action.payload.map((list) => ({ ...list })) : [];
    });
  }
});

export default listsSlice.reducer;
