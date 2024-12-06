import { FaCircleInfo, FaArrowLeft } from "react-icons/fa6";
import styles from "./Conversation.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSafeUserContext } from "../../../../context/AuthenticationContext";
import { User } from "../../../../types/user";
import { getReceiverData } from "../../../../services/messageService";
import { ProfilePhoto } from "../../../../helpers/ProfilePhoto";
import { ROUTES } from "../../../../types/routes";

const Conversation = () => {
  const { currentUserData } = useSafeUserContext();
  const [data, setData] = useState();
  const [receiver, setReceiver] = useState<User>();
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>();
  if (!conversationId) return null;

  useEffect(() => {
    const fetchData = async () => {
      const receiverData = await getReceiverData(
        currentUserData.userId,
        conversationId
      );
      setReceiver(receiverData);
    };
    fetchData();
  }, []);

  useEffect(() => {}, [conversationId]);

  const sendMessage = () => {};

  const back = () => {
    navigate(ROUTES.ROUTE_MESSAGES);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button__return}>
          <FaArrowLeft size={32} />
        </button>

        <div className={styles.profile}>
          <ProfilePhoto profileImage={currentUserData.profileImage} />
        </div>

        <h1 className={styles.heading}>
          {receiver?.fullName ? receiver.fullName : receiver?.email}
        </h1>
        <button className={styles.button__info}>
          <FaCircleInfo size={32} />
        </button>
      </div>
      <div></div>
    </section>
  );
};

export default Conversation;
