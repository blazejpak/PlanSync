import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialStateProps = {
  isStatisticsOpen: boolean;
};

const initialState: InitialStateProps = {
  isStatisticsOpen: false,
};

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState: initialState,
  reducers: {
    statisticsOpen: (state, action: PayloadAction<boolean>) => {
      state.isStatisticsOpen = action.payload;
    },
  },
});

export const selectIsStatisticsOpen = (state: RootState) =>
  state.statistics.isStatisticsOpen;

export const { statisticsOpen } = statisticsSlice.actions;

export default statisticsSlice.reducer;
