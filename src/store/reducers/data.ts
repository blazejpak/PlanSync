import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../helpers/types";
import { RootState } from "../store";
import { DateTime } from "luxon";

const time = DateTime.now().setLocale("en-GB").toISO().slice(0, 10);

type InitialStateProps = {
  tasks: TaskType[];
  currentDay: string;
  rangeDate: { from: string; to: string };
};

const initialState: InitialStateProps = {
  tasks: [],
  currentDay: "",
  rangeDate: { from: time, to: time },
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    sendTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
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

export const getData = (state: RootState) => state.dataSlice.tasks;
export const getCurrentDay = (state: RootState) => state.dataSlice.currentDay;
export const getRangeDate = (state: RootState) => state.dataSlice.rangeDate;

export const { sendTasks, pickCurrentDay, pickRangeDate } = dataSlice.actions;

export default dataSlice.reducer;
