import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../helpers/types";

type InitialStateProps = {
  data: TaskType[];
  day: string;
};

const initialState: InitialStateProps = { data: [], day: "" };

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    getData: (state) => {
      state.data;
    },

    sendData: (state, action: PayloadAction<TaskType[]>) => {
      state.data = action.payload;
    },

    getDay: (state) => {
      state.day;
    },

    sendDay: (state, action: PayloadAction<string>) => {
      state.day = action.payload;
    },
  },
});

export const { getData, sendData, getDay, sendDay } = dataSlice.actions;

export default dataSlice.reducer;
