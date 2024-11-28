import Input from "../../../components/form/Input";

import { FaPen } from "react-icons/fa6";
import styles from "./Messages.module.scss";
import { useSafeResponsiveContext } from "../../../context/responsive";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../../types/routes";

const Messages = () => {
  const { isMobile } = useSafeResponsiveContext();
  if (!isMobile) return <Navigate to={ROUTES.ROUTE_BOARD} replace={true} />;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Chats</h1>
        <button className={styles.button}>
          <FaPen size={24} />
        </button>
      </div>
      <div>
        <Input
          id="message"
          name="message"
          label=""
          placeholder="Search..."
          required={false}
          type="text"
          onChange={() => {}}
        />
      </div>
      <div className={styles.messages}></div>
    </section>
  );
};

export default Messages;
