import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DateTime } from "luxon";
import { DatesZones } from "../../types/dates";

const time = DateTime.now().setLocale(DatesZones.LOCALE).toISODate();

type InitialStateProps = {
  currentDay: string;
  rangeDate: { from: string; to: string };
};

const initialState: InitialStateProps = {
  currentDay: time,
  rangeDate: { from: time, to: time },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    pickCurrentDay: (state, action: PayloadAction<string>) => {
      state.currentDay = action.payload;
    },

    pickRangeDate: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      state.rangeDate = action.payload;
    },
  },
});

export const selectCurrentDay = (state: RootState) => state.calendar.currentDay;
export const selectRangeDate = (state: RootState) => state.calendar.rangeDate;

export const { pickCurrentDay, pickRangeDate } = calendarSlice.actions;

export default calendarSlice.reducer;
