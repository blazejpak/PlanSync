import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./SaveButton.module.scss";

type SaveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isSucceed: boolean;
};

const SaveButton = ({ children, isSucceed, ...props }: SaveButtonProps) => {
  console.log(isSucceed);
  return (
    <button
      {...props}
      className={`${styles.button}  ${isSucceed && styles.succeed}`}
    >
      {children}
    </button>
  );
};

export default SaveButton;
