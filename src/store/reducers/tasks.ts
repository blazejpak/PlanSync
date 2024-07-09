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
} from "firebase/firestore";

export const fetchAllTasks = createAsyncThunk(
  "data/fetchAllTasks",
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
  "data/addTaskToFirestore",
  async (task: Task, { rejectWithValue }) => {
    try {
      const addTask = await addDoc(collection(db, "Tasks"), task);
      const newTask = { id: addTask.id, ...task };
      return newTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTaskFromFirestore = createAsyncThunk(
  "data/deleteTaskFromFirestore",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "Tasks", taskId));
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type InitialStateProps = {
  dataStatus: string;
  dailyTasks: Task[];
};

const initialState: InitialStateProps = {
  dataStatus: "",
  dailyTasks: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    dailyData: (state, action: PayloadAction<Task[]>) => {
      state.dailyTasks = action.payload;
    },
  },
});

export const dataFromTheCurrentDay = (state: RootState) =>
  state.dataSlice.dailyTasks;

export const { dailyData } = dataSlice.actions;

export default dataSlice.reducer;
