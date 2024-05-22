import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

interface initialDataProps {
  user: object;
  createUser: any;
  signIn: any;
  logout: any;
}

const initialData: initialDataProps = {
  user: {},
  createUser: null,
  signIn: null,
  logout: null,
};

export const UserContext = createContext(initialData);

interface AuthenticationContextProviderTypes {
  children: ReactNode;
}

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderTypes) => {
  const [user, setUser] = useState({});

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, createUser, signIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
