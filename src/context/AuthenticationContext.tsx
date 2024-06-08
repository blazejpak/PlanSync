import { ReactNode, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import { firebaseAuth } from "../utils/firebase/firebase";
import { InitialDataProps, LoginValues } from "../utils/firebase/AuthTypes";
import {
  SignInUser,
  SignOutUser,
  SignUpUser,
} from "../utils/firebase/AuthService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { firebaseErrors } from "../utils/firebase/Errors";

type FirebaseErrorKey = keyof typeof firebaseErrors;

const googleProvider = new GoogleAuthProvider();

const initialData: InitialDataProps = {
  user: firebaseAuth.currentUser,
  SignUp: () => {},
  SignIn: () => {},
  SignOut: () => {},
  GoogleLogin: () => {},
  loading: false,
  error: "",
};

export const UserContext = createContext(initialData);

interface AuthenticationContextProviderTypes {
  children: ReactNode;
}

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderTypes) => {
  const [currentUser, setCurrentUser] = useState(initialData.user);
  const [isAuthLoading, setIsAuthLoading] = useState(initialData.loading);
  const [errorMessage, setErrorMessage] = useState(initialData.error);

  const navigate = useNavigate();

  const GoogleLogin = async () => {
    setIsAuthLoading(true);

    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);

      const user = result.user;

      if (user) {
        navigate(ROUTES.ROUTE_BOARD, { replace: true });
      }
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorKey;
      const message =
        firebaseErrors[errorCode] || "Unknown Error. Please again later.";
      setErrorMessage(message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const SignUp = async (creds: LoginValues) => {
    setIsAuthLoading(true);
    SignUpUser(creds)
      .then(async (userCredential) => {
        const { user } = userCredential;

        if (user) {
          setCurrentUser(user);

          navigate(ROUTES.ROUTE_BOARD, { replace: true });
        } else {
          setIsAuthLoading(false);
        }
      })
      .catch((error: any) => {
        const errorCode = error.code as FirebaseErrorKey;
        const message =
          firebaseErrors[errorCode] || "Unknown Error. Please again later.";
        setErrorMessage(message);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const SignIn = async (creds: LoginValues) => {
    setIsAuthLoading(true);
    SignInUser(creds)
      .then((userCredential) => {
        const { user } = userCredential;

        if (user) {
          setCurrentUser(user);
          navigate(ROUTES.ROUTE_BOARD, { replace: true });
        } else {
          setIsAuthLoading(false);
        }
      })
      .catch((error: any) => {
        const errorCode = error.code as FirebaseErrorKey;
        const message =
          firebaseErrors[errorCode] || "Unknown Error. Please again later.";
        setErrorMessage(message);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const SignOut = async () => {
    setIsAuthLoading(true);
    try {
      await SignOutUser();
      setCurrentUser(null);
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorKey;
      const message =
        firebaseErrors[errorCode] || "Unknown Error. Please again later.";
      setErrorMessage(message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(firebaseAuth, (currentUserFromWeb) => {
      if (currentUserFromWeb) {
        setCurrentUser(currentUserFromWeb);
        setErrorMessage("");
      }
      setIsAuthLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);

  const authValues: InitialDataProps = {
    user: currentUser,
    loading: isAuthLoading,
    error: errorMessage,
    SignIn,
    SignUp,
    SignOut,
    GoogleLogin: GoogleLogin,
  };

  return (
    <UserContext.Provider value={authValues}>{children}</UserContext.Provider>
  );
};
