import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import db, { firebaseAuth } from "./firebase";
import { LoginValues, PersonalDataProps } from "./AuthTypes";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

setPersistence(firebaseAuth, browserLocalPersistence);

export const SignInUser = async ({ email, password }: LoginValues) => {
  const result = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};

export const SignUpUser = async ({ email, password }: LoginValues) => {
  const result = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};

export const SignOutUser = async () => {
  await signOut(firebaseAuth);
};

export const CreatePersonalData = async (PersonalData: PersonalDataProps) => {
  const userDocRef = doc(db, "Users", PersonalData.userId);
  await setDoc(userDocRef, PersonalData);

  return PersonalData;
};

export const updatePersonalData = async (PersonalData: PersonalDataProps) => {
  const { userId, ...data } = PersonalData;
  const userDocRef = doc(db, "Users", userId);
  await updateDoc(userDocRef, data);
  return PersonalData;
};

export const getPersonalData = async (id: string) => {
  const userDocRef = doc(db, "Users", id);
  const Snapshot = await getDoc(userDocRef);
  const userDataSnapshot = Snapshot.data() as PersonalDataProps;

  return userDataSnapshot;
};
