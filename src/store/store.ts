import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "./reducers/calendar";
import { tasksSlice } from "./reducers/tasks";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
