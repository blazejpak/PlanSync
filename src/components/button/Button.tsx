import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  typeOfButton: "delete" | "cancel" | null;
};

const Button = ({ children, typeOfButton, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${
        typeOfButton === "delete" && styles.delete
      } ${typeOfButton === "cancel" && styles.cancel}`}
    >
      {children}
    </button>
  );
};

export default Button;
