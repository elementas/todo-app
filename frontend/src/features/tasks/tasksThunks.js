import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAsyncBackendCaller } from '../../utils';

export const getUnfinishedTasks = createAsyncThunk(
  'tasks/unfinished/get',
  getAsyncBackendCaller({
    method: 'GET',
    url: (listId) => {
      return `/app/lists/${listId}/tasks`;
    }
  })
);

export const getFinishedTasks = createAsyncThunk(
  'tasks/finished/get',
  getAsyncBackendCaller({
    method: 'GET',
    url: (listId) => {
      return `/app/lists/${listId}/tasks/finished`;
    }
  })
);

export const addTask = createAsyncThunk(
  'tasks/add',
  getAsyncBackendCaller({
    method: 'POST',
    url: (task) => {
      return `/app/lists/${task.app_list_id}/tasks`;
    }
  })
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  getAsyncBackendCaller({
    method: 'PUT',
    url: (task) => {
      return `/app/lists/${task.app_list_id}/tasks/${task.app_task_id}`;
    }
  })
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  getAsyncBackendCaller({
    method: 'DELETE',
    url: (task) => {
      return `/app/lists/${task.app_list_id}/tasks/${task.app_task_id}`;
    }
  })
);
