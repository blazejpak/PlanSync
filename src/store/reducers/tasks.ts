import { Task } from "./../../types/task";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

import db from "../../utils/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async (_, { rejectWithValue }) => {
    try {
      const tasksSnapshot = await getDocs(collection(db, "Tasks"));
      const tasks = tasksSnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          task: data.task,
          description: data.description,
          subtasks: data.subtasks,
          date: data.date,
          rangeDateFrom: data.rangeDateFrom,
          rangeDateTo: data.rangeDateTo,
          subtasksDone: data.subtasksDone,
          typeOfTask: data.typeOfTask,
          userId: data.userId,
        } as Task;
      });

      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTaskToFirestore = createAsyncThunk(
  "tasks/addTaskToFirestore",
  async (task: Omit<Task, "id">, { rejectWithValue }) => {
    try {
      const addTask = await addDoc(collection(db, "Tasks"), task);
      const newTask = { ...task, id: addTask.id };
      return newTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTaskFromFirestore = createAsyncThunk(
  "tasks/deleteTaskFromFirestore",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "Tasks", taskId));
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTaskFromFirestore = createAsyncThunk(
  "tasks/updateTaskFromFirestore",
  async (updatedTask: Task, { rejectWithValue }) => {
    try {
      const { id, ...taskData } = updatedTask;
      if (id) {
        const taskRef = doc(db, "Tasks", id);
        await updateDoc(taskRef, taskData);
      }
      return updatedTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type Status = "idle" | "loading" | "succeeded" | "failed";

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
  fetchStatus: "idle",
  addStatus: "idle",
  deleteStatus: "idle",
  updateStatus: "idle",
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
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload as string;
      })
      .addCase(addTaskToFirestore.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addTaskToFirestore.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addTaskToFirestore.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteTaskFromFirestore.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteTaskFromFirestore.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.data = state.data.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskFromFirestore.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateTaskFromFirestore.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateTaskFromFirestore.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.data = state.data.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskFromFirestore.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const getAllData = (state: RootState) => state.tasks.data;
export const dataFromTheCurrentDay = (state: RootState) =>
  state.tasks.currentDayData;
export const getFetchStatus = (state: RootState) => state.tasks.fetchStatus;
export const getAddStatus = (state: RootState) => state.tasks.addStatus;
export const getDeleteStatus = (state: RootState) => state.tasks.deleteStatus;
export const getUpdateStatus = (state: RootState) => state.tasks.updateStatus;

export const { dailyData } = tasksSlice.actions;

export default tasksSlice.reducer;
