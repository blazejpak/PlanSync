import Input from "../../../../components/form/Input";

import { FaPen } from "react-icons/fa6";
import styles from "./Messages.module.scss";
import { useSafeResponsiveContext } from "../../../../context/responsive";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../types/routes";
import { DateTime } from "luxon";
import NavigationMobile from "../../../../components/navigation/NavigationMobile";

const Messages = () => {
  const { isMobile } = useSafeResponsiveContext();
  const today = DateTime.now().toISODate();
  const navigate = useNavigate();
  if (!isMobile) {
    return <Navigate to={ROUTES.ROUTE_BOARD(today)} replace={true} />;
  }

  const newMessage = () => {
    navigate(ROUTES.ROUTE_NEW_MESSAGE);
  };

  return (
    <section className={styles.container}>
      <div>
        <div className={styles.header}>
          <h1 className={styles.heading}>Chats</h1>
          <button className={styles.button} onClick={newMessage}>
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
      </div>
      <NavigationMobile />
    </section>
  );
};

export default Messages;
