import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./reducers/data";

export const store = configureStore({
  reducer: {
    dataSlice: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
