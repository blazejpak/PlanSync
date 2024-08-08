import { ReactNode } from "react";
import styles from "./Indentation.module.scss";

interface IndentationProps {
  children: ReactNode;
}

const Indentation = ({ children }: IndentationProps) => {
  return <div className={styles.content}>{children}</div>;
};

export default Indentation;
