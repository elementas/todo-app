import { combineSlices } from '@reduxjs/toolkit';
import unfinishedTasksSlice from './unfinishedTasksSlice';
import finishedTasksSlice from './finishedTasksSlice';

export default combineSlices({
  finished: finishedTasksSlice,
  unfinished: unfinishedTasksSlice
});
