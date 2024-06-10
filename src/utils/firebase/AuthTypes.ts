import { User } from "firebase/auth";

export interface LoginValues {
  email: string;
  password: string;
}

export interface InitialDataProps {
  user: User | null;
  SignUp: (creds: LoginValues) => void;
  SignIn: (creds: LoginValues) => void;
  SignOut: () => void;
  GoogleLogin: () => void;
  loading: boolean;
  error: string;
}
