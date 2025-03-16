import { ReactNode } from "react";

import styles from "./OverlayWhite.module.scss";

type OverlayProps = {
  children: ReactNode;
};

const OverlayWhite = ({ children }: OverlayProps) => {
  return <div className={styles["modal-overlay"]}>{children}</div>;
};

export default OverlayWhite;
