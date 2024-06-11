import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { LoginValues } from "./AuthTypes";

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
