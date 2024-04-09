import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAsyncBackendCaller } from '../../utils';

export const check = createAsyncThunk(
  'auth/check',
  getAsyncBackendCaller({
    method: 'GET',
    url: '/app/auth/check'
  })
);
export const login = createAsyncThunk(
  'auth/login',
  getAsyncBackendCaller({
    method: 'POST',
    url: '/app/auth/login'
  })
);
export const logout = createAsyncThunk(
  'auth/logout',
  getAsyncBackendCaller({
    method: 'POST',
    url: '/app/auth/logout'
  })
);
export const register = createAsyncThunk(
  'auth/register',
  getAsyncBackendCaller({
    method: 'POST',
    url: '/app/auth/register'
  })
);
