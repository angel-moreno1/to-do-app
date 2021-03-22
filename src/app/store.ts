import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import toDosSlice from '../features/ToDo/toDoSlice'

export const store = configureStore({
  reducer: {
    toDos: toDosSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
