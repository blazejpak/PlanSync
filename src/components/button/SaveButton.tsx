import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./SaveButton.module.scss";

type SaveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const SaveButton = ({ children, ...props }: SaveButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default SaveButton;
