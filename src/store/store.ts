import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./reducers/data";
import { dateSlice } from "./reducers/date";

export const store = configureStore({
  reducer: {
    dataSlice: dataSlice.reducer,
    dateSlice: dateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
