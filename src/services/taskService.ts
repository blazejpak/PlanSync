import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../utils/firebase/firebase";
import { Task } from "../types/task";

export const fetchAll = async () => {
  const tasksSnapshot = await getDocs(collection(db, "Tasks"));
  return tasksSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
    } as Task;
  });
};

export const add = async (task: Omit<Task, "id">) => {
  const addTask = await addDoc(collection(db, "Tasks"), task);
  return { ...task, id: addTask.id };
};

export const remove = async (taskId: string) => {
  return await deleteDoc(doc(db, "Tasks", taskId));
};

export const update = async (updatedTask: Task) => {
  const { id, ...taskData } = updatedTask;
  const taskRef = doc(db, "Tasks", id);
  await updateDoc(taskRef, taskData);
};

export const taskService = {
  fetchAll,
  add,
  remove,
  update,
};
