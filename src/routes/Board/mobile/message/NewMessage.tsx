import { FaArrowLeft } from "react-icons/fa";
import { Skeleton } from "@mui/material";

import styles from "./NewMessage.module.scss";
import { useSafeResponsiveContext } from "../../../../context/responsive";
import { DateTime } from "luxon";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../types/routes";
import Input from "../../../../components/form/Input";
import { findUserByName } from "../../../../services/messageService";
import { useState } from "react";
import { User } from "../../../../types/user";
import List from "../../../../components/messages/List";
import useCheckIsMobile from "../../../../hooks/useCheckIsMobile";

const NewMessage = () => {
  useCheckIsMobile();

  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const { userId } = useParams<{ userId: string }>();

  const { isMobile } = useSafeResponsiveContext();
  const today = DateTime.now().toISODate();
  const navigate = useNavigate();
  if (!isMobile) {
    return <Navigate to={ROUTES.ROUTE_BOARD(today)} replace={true} />;
  }

  const backToMessages = () => {
    if (userId) {
      navigate(ROUTES.ROUTE_MESSAGES(userId));
    }
  };

  const findUser = async (text: string) => {
    try {
      if (text.length >= 3) {
        setLoading(true);
        const findUsersByName = await findUserByName(text.toLocaleLowerCase());
        setUsers(findUsersByName);
      }
    } catch (error) {
      console.error("Error finding user:", error);
    } finally {
      setLoading(false);
    }
  };

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
          values=""
        />
      </div>

      <div>
        {loading ? (
          <div>
            <Skeleton
              variant="rounded"
              height={100}
              style={{ marginTop: "2rem" }}
            />
            <Skeleton
              variant="rounded"
              height={100}
              style={{ marginTop: "2rem" }}
            />
            <Skeleton
              variant="rounded"
              height={100}
              style={{ marginTop: "2rem" }}
            />
          </div>
        ) : (
          <div className={styles.list}>
            {users?.map((user) => (
              <li key={user.userId} className={styles.list__item}>
                <List data={user} typeOfList="searchList" />
              </li>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewMessage;
