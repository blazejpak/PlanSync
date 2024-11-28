import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithPopup,
  updatePassword,
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
import { ROUTES } from "../types/routes";
import { firebaseErrors } from "../utils/firebase/Errors";
import { doc, getDoc } from "firebase/firestore";
import { DateTime } from "luxon";
import { DatesZones } from "../types/dates";

type FirebaseErrorKey = keyof typeof firebaseErrors;

const googleProvider = new GoogleAuthProvider();
const time = DateTime.now().setLocale(DatesZones.LOCALE).toISODate();

const initialCurrentUserData: PersonalDataProps = {
  userId: "",
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
  UpdateUserPassword: () => {},
  loading: true,
  error: "",
  currentUserData: initialCurrentUserData,
  isSucceed: false,
};

const UserContext = createContext(initialData);

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
  const [isSucceed, setIsSucceed] = useState(false);

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
            ...initialCurrentUserData,
            userId: user.uid,
            email: user.email?.toLocaleLowerCase() || "",
            phoneNumber: null,
            fullName: user.displayName?.toLocaleLowerCase() || "",
          });
          setCurrentUserData(userData);
        }
        navigate(ROUTES.ROUTE_BOARD(time), { replace: true });
      }
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorKey;
      const message =
        firebaseErrors[errorCode] || "Unknown Error. Please try again later.";
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
            ...initialCurrentUserData,
            userId: user.uid,
            email: user.email?.toLocaleLowerCase() || "",
            phoneNumber: null,
            fullName: user.displayName?.toLocaleLowerCase() || "",
          });
          setCurrentUserData(userData);
          navigate(ROUTES.ROUTE_BOARD(time), { replace: true });
        } else {
          setIsAuthLoading(false);
        }
      })
      .catch((error: any) => {
        const errorCode = error.code as FirebaseErrorKey;
        const message =
          firebaseErrors[errorCode] || "Unknown Error. Please try again later.";
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
        navigate(ROUTES.ROUTE_BOARD(time), { replace: true });
      } else {
        setIsAuthLoading(false);
      }
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorKey;
      const message =
        firebaseErrors[errorCode] || "Unknown Error. Please try again later.";
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
      window.location.reload();
      navigate(ROUTES.ROUTE_HOME, { replace: true });
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorKey;
      const message =
        firebaseErrors[errorCode] || "Unknown Error. Please try again later.";
      setErrorMessage(message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const UpdateUserPassword = async (prevPassword: string, password: string) => {
    try {
      setIsAuthLoading(true);
      if (currentUser.email) {
        let credential = EmailAuthProvider.credential(
          currentUser.email,
          prevPassword
        );

        await reauthenticateWithCredential(currentUser, credential);

        await updatePassword(currentUser, password);
      }
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorKey;
      const message =
        firebaseErrors[errorCode] ||
        "Can't update password. Please try again later.";
      setErrorMessage(message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const UpdateUserData = async (data: PersonalDataProps) => {
    const userData = await updatePersonalData(data);
    setIsSucceed(true);
    setTimeout(() => {
      setIsSucceed(false);
    }, 1000);
    setCurrentUserData(userData);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUserFromWeb) => {
        try {
          setIsAuthLoading(true);
          if (currentUserFromWeb) {
            setCurrentUser(currentUserFromWeb);
            const userData = await getPersonalData(currentUserFromWeb.uid);
            setCurrentUserData(userData);
            setErrorMessage("");
          } else {
            navigate(ROUTES.ROUTE_HOME, { replace: true });
            setCurrentUserData(initialCurrentUserData);
          }
        } catch (error: any) {
          const errorCode = error.code as FirebaseErrorKey;
          const message =
            firebaseErrors[errorCode] ||
            "Something went wrong. Please try again later.";
          setErrorMessage(message);
        } finally {
          setIsAuthLoading(false);
        }
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
    isSucceed,
    SignIn,
    SignUp,
    SignOut,
    GoogleLogin: GoogleLogin,
    currentUserData,
    UpdateUserData,
    UpdateUserPassword,
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
