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
  errorMessage: string;
}

const initialData: initialDataProps = {
  user: { email: "", displayName: "", uid: "" },
  createUser: null,
  signIn: null,
  logout: null,
  GoogleLogin: null,
  loading: true,
  errorMessage: "",
};

export const UserContext = createContext(initialData);

interface AuthenticationContextProviderTypes {
  children: ReactNode;
}

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderTypes) => {
  const [user, setUser] = useState(initialData.user);
  const [loading, setLoading] = useState(initialData.loading);
  const [errorMessage, setErrorMessage] = useState(initialData.errorMessage);

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider);
  };

  const createUser = (email: string, password: string) => {
    try {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).catch(
      (error: any) => {
        console.log("type errprrrr:  " + error);
        setErrorMessage(error.message);
      }
    );
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setErrorMessage("");
      }
      setLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        GoogleLogin,
        createUser,
        signIn,
        logout,
        loading,
        errorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
