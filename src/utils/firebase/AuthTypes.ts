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
  phoneNumber: number | null;
  email: string;
  role: "user" | "admin";
  uiTheme: "light" | "dark";
}
