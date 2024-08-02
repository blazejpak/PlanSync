import { RiseLoader } from "react-spinners";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.overlay}>
      <RiseLoader size={24} color="#4455cf" />
    </div>
  );
};

export default Loading;
