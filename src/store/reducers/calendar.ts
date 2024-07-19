import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DateTime, Interval } from "luxon";
import { dailyData } from "./tasks";

const time = DateTime.now().setLocale("en-GB").toISO().slice(0, 10);

type InitialStateProps = {
  currentDay: string;
  rangeDate: { from: string; to: string };
};

const initialState: InitialStateProps = {
  currentDay: "",
  rangeDate: { from: time, to: time },
};

export const pickCurrentDay = createAsyncThunk(
  "calendar/pickCurrentDay",
  async (dataISO: string, { dispatch, getState }) => {
    const day = (getState() as RootState).calendar.currentDay;
    const newData = (getState() as RootState).tasks.data.filter((item) => {
      const dateFrom = DateTime.fromISO(item.rangeDateFrom).startOf("day");
      const dateTo = DateTime.fromISO(item.rangeDateTo).endOf("day");
      const interval = Interval.fromDateTimes(dateFrom, dateTo);

      return interval.contains(DateTime.fromISO(day).startOf("day"));
    });

    dispatch(dailyData(newData));


    return dataISO;
  }
);

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
   pickRangeDate: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      state.rangeDate = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(pickCurrentDay.fulfilled, (state, action) => {
    state.currentDay = action.payload;
  })
});

export const getCurrentDay = (state: RootState) => state.calendar.currentDay;
export const getRangeDate = (state: RootState) => state.calendar.rangeDate;

export const { pickRangeDate } = calendarSlice.actions;

export default calendarSlice.reducer;
