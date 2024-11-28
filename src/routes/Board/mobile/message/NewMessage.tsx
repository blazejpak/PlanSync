import { FaArrowLeft } from "react-icons/fa";

import styles from "./NewMessage.module.scss";
import { useSafeResponsiveContext } from "../../../../context/responsive";
import { DateTime } from "luxon";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../types/routes";
import Input from "../../../../components/form/Input";
import { findUserByName } from "../../../../services/messageService";
import { useState } from "react";
import { User } from "../../../../types/user";

const NewMessage = () => {
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  const { isMobile } = useSafeResponsiveContext();
  const today = DateTime.now().toISODate();
  const navigate = useNavigate();
  if (!isMobile) {
    return <Navigate to={ROUTES.ROUTE_BOARD(today)} replace={true} />;
  }

  const backToMessages = () => {
    navigate(ROUTES.ROUTE_MESSAGES);
  };

  const findUser = async (text: string) => {
    try {
      if (text.length >= 3) {
        setLoading(true);
        const findUsersByName = await findUserByName(text.toLocaleLowerCase());
        console.log(findUsersByName);
        setUsers(findUsersByName);
      }
    } catch (error) {
      console.error("Error finding user:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(users);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button} onClick={backToMessages}>
          <FaArrowLeft size={24} />
        </button>
        <strong>New Message</strong>
      </div>

      <div>
        <Input
          id="message"
          name="message"
          label=""
          placeholder="Find user by e-mail or name. (min. 3 characters)"
          required={false}
          type="text"
          onChange={(e) => findUser(e.target.value)}
        />
      </div>

      <div></div>
    </section>
  );
};

export default NewMessage;
