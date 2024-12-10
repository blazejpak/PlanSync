import { FaCircleInfo, FaArrowLeft } from "react-icons/fa6";
import styles from "./Conversation.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSafeUserContext } from "../../../../context/AuthenticationContext";
import { User } from "../../../../types/user";
import {
  getMessages,
  getReceiverData,
  sendMessage,
  updateConversation,
} from "../../../../services/messageService";
import { ProfilePhoto } from "../../../../helpers/ProfilePhoto";
import { ROUTES } from "../../../../types/routes";
import { Message } from "../../../../types/messages";
import { GetSettingsData } from "../../../../helpers/GetSettingsData";

const Conversation = () => {
  GetSettingsData();
  const { currentUserData } = useSafeUserContext();
  const [data, setData] = useState<Message[]>([]);
  const [receiver, setReceiver] = useState<User>();
  const [messageText, setMessageText] = useState("");
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

  useEffect(() => {
    const unsubscribe = getMessages(conversationId, setData);

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (receiver?.userId && currentUserData.userId) {
      const message = await sendMessage({
        conversationId,
        messageContent: messageText,
        senderId: currentUserData.userId,
        receiverId: receiver.userId,
      });
      console.log(message);

      const timestamp = message.timestamp;

      console.log(timestamp);

      await updateConversation(conversationId, messageText, timestamp);

      setMessageText("");
    }
  };

  const back = () => {
    navigate(ROUTES.ROUTE_MESSAGES);
  };

  console.log(messageText);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <button className={styles.button__return} onClick={back}>
          <FaArrowLeft size={32} />
        </button>

        <div className={styles.profile}>
          <ProfilePhoto profileImage={receiver?.profileImage} />
        </div>

        <h1 className={styles.heading}>
          {receiver?.fullName ? receiver.fullName : receiver?.email}
        </h1>
        <button className={styles.button__info}>
          <FaCircleInfo size={32} />
        </button>
      </div>
      <div></div>
      <form onSubmit={sendMessageSubmit}>
        <input
          type="text"
          value={messageText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessageText(e.target.value)
          }
        />
        <button>send</button>
      </form>
    </section>
  );
};

export default Conversation;
