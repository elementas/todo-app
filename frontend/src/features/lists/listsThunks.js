import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAsyncBackendCaller } from '../../utils';

export const getLists = createAsyncThunk(
  'lists/get',
  getAsyncBackendCaller({
    method: 'GET',
    url: '/app/lists'
  })
);

export const addList = createAsyncThunk(
  'lists/add',
  getAsyncBackendCaller({
    method: 'POST',
    url: '/app/lists'
  })
);

export const updateList = createAsyncThunk(
  'lists/update',
  getAsyncBackendCaller({
    method: 'PUT',
    url: (list) => {
      return `/app/lists/${list.app_list_id}`;
    }
  })
);

export const deleteList = createAsyncThunk(
  'lists/delete',
  getAsyncBackendCaller({
    method: 'DELETE',
    url: (list) => {
      return `/app/lists/${list.app_list_id}`;
    }
  })
);
