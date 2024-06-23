import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

const time = DateTime.now().setLocale("en-GB").toISO().slice(0, 10);

type InitialStateProps = {
  date: string;
};

const initialState: InitialStateProps = { date: time };

export const dateSlice = createSlice({
  name: "date",
  initialState: initialState,
  reducers: {
    pickDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const { pickDate } = dateSlice.actions;

export default dateSlice.reducer;
