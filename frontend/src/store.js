import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import registrationReducer from './features/auth/registrationSlice';
import listsReducer from './features/lists/listsSlice';
import listReducer from './features/lists/listSlice';
import tasksReducer from './features/tasks/tasksSlice';
import finishedTasksReducer from './features/tasks/finishedTasksSlice';
import taskReducer from './features/tasks/taskSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    lists: listsReducer,
    list: listReducer,
    tasks: tasksReducer,
    task: taskReducer,
    finishedTasks: finishedTasksReducer
  }
});
