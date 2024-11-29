import { FaArrowRight } from "react-icons/fa6";
import { User } from "../../../../types/user";

import styles from "./List.module.scss";
import { useSafeUserContext } from "../../../../context/AuthenticationContext";
import { createNewConversation } from "../../../../services/messageService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../types/routes";

const List = ({ data }: { data: User }) => {
  const { currentUserData } = useSafeUserContext();
  const navigate = useNavigate();

  if (data.userId === currentUserData.userId) return null;

  const fullName = data.fullName
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const newConversation = async (receiver: string) => {
    const conversationId = await createNewConversation(
      currentUserData.userId,
      receiver
    );

    if (conversationId) {
      navigate(ROUTES.ROUTE_CONVERSATION(conversationId));
    }
  };

  return (
    <button
      className={styles.container}
      onClick={() => newConversation(data.userId)}
    >
      <div className={styles.list}>
        <div>
          <p>Name: </p>
          <strong>{fullName ? fullName : "Unknown"}</strong>
        </div>
        <div>
          <p>Email: </p>
          <strong>{data.email}</strong>
        </div>
      </div>

      <button className={styles.button}>
        <FaArrowRight size={24} />
      </button>
    </button>
  );
};

export default List;
