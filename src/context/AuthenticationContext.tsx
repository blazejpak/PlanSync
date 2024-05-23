import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

interface User {
  displayName: string | null;
  email: string | null;
  uid: string;
}

interface initialDataProps {
  user: User;
  createUser: any;
  signIn: any;
  logout: any;
  GoogleLogin: any;
  loading: boolean;
}

const initialData: initialDataProps = {
  user: { email: "", displayName: "", uid: "" },
  createUser: null,
  signIn: null,
  logout: null,
  GoogleLogin: null,
  loading: true,
};

export const UserContext = createContext(initialData);

interface AuthenticationContextProviderTypes {
  children: ReactNode;
}

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderTypes) => {
  const [user, setUser] = useState(initialData.user);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider);
  };

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, GoogleLogin, createUser, signIn, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
