import { Status, Task } from "./../../types/task";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

import {
  addTaskToFirestore,
  deleteTaskFromFirestore,
  fetchAllTasksfromFirestore,
  updateTaskInFirestore,
} from "../../services/taskService";

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await fetchAllTasksfromFirestore();

      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "id">, { rejectWithValue }) => {
    try {
      const newTask = await addTaskToFirestore(task);
      return newTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await deleteTaskFromFirestore(taskId);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task, { rejectWithValue }) => {
    try {
      await updateTaskInFirestore(updatedTask);

      return updatedTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type InitialStateProps = {
  fetchStatus: Status;
  addStatus: Status;
  deleteStatus: Status;
  updateStatus: Status;
  error: string;
  data: Task[];
  currentDayData: Task[];
};

const initialState: InitialStateProps = {
  fetchStatus: Status.IDLE,
  addStatus: Status.IDLE,
  deleteStatus: Status.IDLE,
  updateStatus: Status.IDLE,
  error: "",
  data: [],
  currentDayData: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    dailyData: (state, action: PayloadAction<Task[]>) => {
      state.currentDayData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.fetchStatus = Status.LOADING;
        state.error = "";
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.fetchStatus = Status.SUCCEEDED;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.fetchStatus = Status.FAILED;
        state.error = action.payload as string;
      })
      .addCase(addTask.pending, (state) => {
        state.addStatus = Status.LOADING;
        state.error = "";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.addStatus = Status.SUCCEEDED;
        state.error = "";

        state.data.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.addStatus = Status.FAILED;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.deleteStatus = Status.LOADING;
        state.error = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteStatus = Status.SUCCEEDED;
        state.error = "";

        state.data = state.data.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteStatus = Status.FAILED;
        state.error = action.payload as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.updateStatus = Status.LOADING;
        state.error = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateStatus = Status.SUCCEEDED;
        state.error = "";

        state.data = state.data.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateStatus = Status.FAILED;
        state.error = action.payload as string;
      });
  },
});

export const getAllData = (state: RootState) => state.tasks.data;
export const getAllFromTasksSlice = (state: RootState) => state.tasks;
export const dataFromTheCurrentDay = (state: RootState) =>
  state.tasks.currentDayData;

export const selectFetchStatus = (state: RootState) => state.tasks.fetchStatus;
export const selectAddStatus = (state: RootState) => state.tasks.addStatus;
export const selectDeleteStatus = (state: RootState) =>
  state.tasks.deleteStatus;
export const selectUpdateStatus = (state: RootState) =>
  state.tasks.updateStatus;

export const { dailyData } = tasksSlice.actions;

export default tasksSlice.reducer;
