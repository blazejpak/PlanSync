import { User } from "firebase/auth";

export interface LoginValues {
  email: string;
  password: string;
}

export interface InitialDataProps {
  user: User;
  SignUp: (creds: LoginValues) => void;
  SignIn: (creds: LoginValues) => void;
  SignOut: () => void;
  GoogleLogin: () => void;
  UpdateUserData: (data: PersonalDataProps) => void;
  UpdateUserPassword: (prevPassword: string, password: string) => void;
  loading: boolean;
  error: string;
  currentUserData: PersonalDataProps;
  isSucceed: boolean;
}

export interface PersonalDataProps {
  userId: string;
  fullName: string;
  phoneNumber: string | null;
  email: string;
  role: "user" | "admin";
  appSettings: {
    uiTheme: "light" | "dark";
    fontFamily: "Rubik" | "Lora" | "Montserrat";
    fontSize: "small" | "medium" | "large";
  };
  profileImage: string;
}
