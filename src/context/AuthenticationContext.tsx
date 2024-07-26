import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import db, { firebaseAuth } from "../utils/firebase/firebase";
import {
  InitialDataProps,
  LoginValues,
  PersonalDataProps,
} from "../utils/firebase/AuthTypes";
import {
  CreatePersonalData,
  getPersonalData,
  SignInUser,
  SignOutUser,
  SignUpUser,
  updatePersonalData,
} from "../utils/firebase/AuthService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { firebaseErrors } from "../utils/firebase/Errors";
import { doc, getDoc } from "firebase/firestore";

type FirebaseErrorKey = keyof typeof firebaseErrors;

const googleProvider = new GoogleAuthProvider();

const initialCurrentUserData: PersonalDataProps = {
  userId: "",
  userName: "",
  fullName: "",
  phoneNumber: null,
  email: "",
  role: "user",
  appSettings: {
    uiTheme: "light",
    fontFamily: "Rubik",
    fontSize: "medium",
  },
};

const initialData: InitialDataProps = {
  user: firebaseAuth.currentUser!,
  SignUp: () => {},
  SignIn: () => {},
  SignOut: () => {},
  GoogleLogin: () => {},
  UpdateUserData: () => {},
  loading: false,
  error: "",
  currentUserData: initialCurrentUserData,
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
  const [currentUserData, setCurrentUserData] = useState<PersonalDataProps>(
    initialData.currentUserData
  );

  const navigate = useNavigate();

  const GoogleLogin = async () => {
    setIsAuthLoading(true);

    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);

      const user = result.user;

      if (user) {
        setCurrentUser(user);

        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const userData = await CreatePersonalData({
            userId: user.uid,
            fullName: "",
            email: user.email || "",
            phoneNumber: null,
            role: "user",
            appSettings: {
              uiTheme: "light",
              fontFamily: "Rubik",
              fontSize: "medium",
            },
            userName: user.displayName || "",
          });
          setCurrentUserData(userData);
        }
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
          const userData = await CreatePersonalData({
            userId: user.uid,
            fullName: "",
            email: user.email || "",
            phoneNumber: null,
            role: "user",
            appSettings: {
              uiTheme: "light",
              fontFamily: "Rubik",
              fontSize: "medium",
            },
            userName: user.displayName || "",
          });
          setCurrentUserData(userData);
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

    try {
      const userCredential = await SignInUser(creds);
      const { user } = userCredential;
      if (user) {
        setCurrentUser(user);
        const userData = await getPersonalData(user.uid);
        setCurrentUserData(userData);
        navigate(ROUTES.ROUTE_BOARD, { replace: true });
      } else {
        setIsAuthLoading(false);
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

  const SignOut = async () => {
    setIsAuthLoading(true);
    try {
      await SignOutUser();

      setCurrentUserData(initialCurrentUserData);
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorKey;
      const message =
        firebaseErrors[errorCode] || "Unknown Error. Please again later.";
      setErrorMessage(message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const UpdateUserData = async (data: PersonalDataProps) => {
    const userData = await updatePersonalData(data);
    setCurrentUserData(userData);
    // console.log(userData);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUserFromWeb) => {
        if (currentUserFromWeb) {
          setCurrentUser(currentUserFromWeb);
          const userData = await getPersonalData(currentUserFromWeb.uid);
          setCurrentUserData(userData);
          setErrorMessage("");
        }
        setIsAuthLoading(false);
      }
    );
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
    currentUserData,
    UpdateUserData,
  };

  return (
    <UserContext.Provider value={authValues}>{children}</UserContext.Provider>
  );
};

export const useSafeUserContext = () => {
  const value = useContext(UserContext);
  if (value === undefined) {
    throw new Error("Context value is undefined");
  }
  return value;
};
