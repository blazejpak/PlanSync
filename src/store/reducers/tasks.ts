import { Status, Task } from "./../../types/task";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { taskService } from "../../services/taskService";

export const fetchAllTasksByUser = createAsyncThunk(
  "tasks/fetchAllTasks",
  async (id: string, { rejectWithValue }) => {
    try {
      const tasks = await taskService.fetchTasksByUserId(id);

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
      const newTask = await taskService.add(task);
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
      await taskService.remove(taskId);
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
      await taskService.update(updatedTask);

      return updatedTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWorkflowStep = createAsyncThunk(
  "tasks/updateWorkflowStep",
  async (
    { id, newType }: { id: string; newType: "todo" | "progress" | "done" },
    { rejectWithValue }
  ) => {
    try {
      await taskService.updateWorkflowStep(id, newType);

      return { id, newType };
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
  areTasksLoaded: Boolean;
  error: string;
  data: Task[];
  currentDayData: Task[];
  workData: Task[];
};

const initialState: InitialStateProps = {
  fetchStatus: Status.IDLE,
  addStatus: Status.IDLE,
  deleteStatus: Status.IDLE,
  updateStatus: Status.IDLE,
  areTasksLoaded: false,
  error: "",
  data: [],
  currentDayData: [],
  workData: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    dailyData: (state, action: PayloadAction<Task[]>) => {
      state.currentDayData = action.payload;
    },
    workData: (state, action: PayloadAction<Task[]>) => {
      state.workData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasksByUser.pending, (state) => {
        state.fetchStatus = Status.LOADING;
        state.error = "";
      })
      .addCase(fetchAllTasksByUser.fulfilled, (state, action) => {
        state.fetchStatus = Status.SUCCEEDED;
        state.data = action.payload;
        state.error = "";
        state.areTasksLoaded = true;
      })
      .addCase(fetchAllTasksByUser.rejected, (state, action) => {
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
      })
      .addCase(updateWorkflowStep.pending, (state) => {
        state.updateStatus = Status.LOADING;
        state.error = "";
      })
      .addCase(updateWorkflowStep.fulfilled, (state, action) => {
        state.updateStatus = Status.SUCCEEDED;
        state.error = "";

        state.data = state.data.map((task) =>
          task.id === action.payload.id
            ? { ...task, typeOfTask: action.payload.newType }
            : task
        );
      })
      .addCase(updateWorkflowStep.rejected, (state, action) => {
        state.updateStatus = Status.FAILED;
        state.error = action.payload as string;
      });
  },
});

export const selectAllData = (state: RootState) => state.tasks.data;
export const selectAllFromTasksSlice = (state: RootState) => state.tasks;
export const selectDataFromTheCurrentDay = (state: RootState) =>
  state.tasks.currentDayData;

export const selectFetchStatus = (state: RootState) => state.tasks.fetchStatus;
export const selectAreTasksLoaded = (state: RootState) =>
  state.tasks.areTasksLoaded;
export const selectAddStatus = (state: RootState) => state.tasks.addStatus;
export const selectDeleteStatus = (state: RootState) =>
  state.tasks.deleteStatus;
export const selectUpdateStatus = (state: RootState) =>
  state.tasks.updateStatus;

export const selectTasksSlice = (state: RootState) => state.tasks;

export const { dailyData, workData } = tasksSlice.actions;

export default tasksSlice.reducer;
