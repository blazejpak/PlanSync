import { FaArrowRight } from "react-icons/fa6";
import { User } from "../../types/user";

import styles from "./List.module.scss";
import { useSafeUserContext } from "../../context/AuthenticationContext";
import { createNewConversation } from "../../services/messageService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../types/routes";
import { ProfilePhoto } from "../../helpers/ProfilePhoto";
import { useSafeResponsiveContext } from "../../context/responsive";
import { useSafeMessagesContext } from "../../context/Messages";

const List = ({
  data,
  typeOfList,
}: {
  data: User;
  typeOfList: "searchList" | "conversationList";
}) => {
  const { currentUserData } = useSafeUserContext();
  const { isMobile } = useSafeResponsiveContext();
  const {
    changeIsConversationsOpen,
    isConversationsOpen,
    changeConversationId,
    changeIsConversationOpen,
  } = useSafeMessagesContext();
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

    if (conversationId && isMobile) {
      navigate(
        ROUTES.ROUTE_CONVERSATION(currentUserData.userId, conversationId)
      );
    }

    if (conversationId && !isMobile) {
      if (isConversationsOpen) {
        changeIsConversationsOpen();
        changeConversationId(conversationId);
        changeIsConversationOpen();
      }
    }
  };

  return (
    <button
      className={styles.container}
      onClick={() => newConversation(data.userId)}
    >
      {typeOfList === "searchList" && (
        <ProfilePhoto profileImage={data.profileImage} />
      )}

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

      <div className={styles.button}>
        <FaArrowRight size={24} />
      </div>
    </button>
  );
};

export default List;
