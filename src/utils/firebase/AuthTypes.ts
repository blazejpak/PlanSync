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
  loading: boolean;
  error: string;
  currentUserData: PersonalDataProps;
}

export interface PersonalDataProps {
  userId: string;
  userName: string;
  fullName: string;
  phoneNumber: string | null;
  email: string;
  role: "user" | "admin";
  appSettings: {
    uiTheme: "light" | "dark";
    fontFamily: "Rubik" | "Lora" | "Montserrat";
    fontSize: "small" | "medium" | "large";
  };
}
