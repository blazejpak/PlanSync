import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/task";
import { RootState } from "../store";
import { DateTime } from "luxon";

const time = DateTime.now().setLocale("en-GB").toISO().slice(0, 10);

type InitialStateProps = {
  allTasks: Task[];
  dailyTasks: Task[];
  currentDay: string;
  rangeDate: { from: string; to: string };
};

const initialState: InitialStateProps = {
  allTasks: [],
  dailyTasks: [],
  currentDay: "",
  rangeDate: { from: time, to: time },
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    allData: (state, action: PayloadAction<Task[]>) => {
      state.allTasks = action.payload;
    },

    dailyData: (state, action: PayloadAction<Task[]>) => {
      state.dailyTasks = action.payload;
    },

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

export const dataFromAllDays = (state: RootState) => state.dataSlice.allTasks;
export const dataFromTheCurrentDay = (state: RootState) =>
  state.dataSlice.dailyTasks;
export const getCurrentDay = (state: RootState) => state.dataSlice.currentDay;
export const getRangeDate = (state: RootState) => state.dataSlice.rangeDate;

export const { allData, dailyData, pickCurrentDay, pickRangeDate } =
  dataSlice.actions;

export default dataSlice.reducer;
