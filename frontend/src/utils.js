import axios, { isAxiosError } from 'axios';

const DEFAULT_ERROR = {
  statusCode: 500,
  errorCode: 'server_error',
  message: 'server_error'
};

export function getAsyncBackendCaller(axiosOptions, forwardData = true) {
  return async (data, thunkAPI) => {
    try {
      const options = { ...axiosOptions };

      if (data && forwardData) {
        options.data = data;
      }

      if (typeof options.url === 'function') {
        options.url = options.url(data);
      }

      if (typeof options.params === 'function') {
        options.params = options.params(data);
      }

      const response = await axios(options);

      if (response.data.status === 'success') {
        return response.data?.data;
      } else {
        return thunkAPI.rejectWithValue({ ...DEFAULT_ERROR });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(getRequestErrorObject(err));
    }
  };
}

export function getRequestErrorObject(err) {
  if (isAxiosError(err)) {
    if (err.response) {
      if (typeof err.response.data === 'object') {
        return {
          statusCode: err.response.status,
          message: err.response.data?.message || 'server_error',
          errorCode: err.response.data?.data?.code || 'server_error'
        };
      }
    } else if (err.request) {
      console.error('Failed to receive a response: ', err.request);
    } else {
      console.error('An error occurred while making a request:', err);
    }
  } else {
    console.error('An unexpected error has occurred:', err);
  }

  return { ...DEFAULT_ERROR };
}
