import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import db from "../utils/firebase/firebase";
import { User } from "../types/user";

export const findUserByName = async (name: string): Promise<User[]> => {
  const userRef = collection(db, "Users");

  const tasksQuery = query(
    userRef,
    orderBy("fullName"), // Pole, po którym będzie sortowane i przeszukiwane
    startAt(name),
    endAt(name + "\uf8ff") // Firebase hack do wyszukiwania prefiksu
  );
  const tasksSnapshot = await getDocs(tasksQuery);

  return tasksSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      userId: doc.id,
      ...data,
    } as User;
  });
};
