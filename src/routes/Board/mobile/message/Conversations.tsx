import Input from "../../../../components/form/Input";

import { FaPen } from "react-icons/fa6";
import { PiEmpty } from "react-icons/pi";
import styles from "./Conversations.module.scss";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../types/routes";
import NavigationMobile from "../../../../components/navigation/NavigationMobile";
import { useEffect, useState } from "react";
import { useSafeUserContext } from "../../../../context/AuthenticationContext";
import {
  findConversationsByUserId,
  getReceiverData,
} from "../../../../services/messageService";
import { Conversation } from "../../../../types/messages";
import { User } from "../../../../types/user";
import List from "./List";
import { Skeleton } from "@mui/material";
import { CheckIsMobile } from "../../../../helpers/CheckIsMobile";

const Conversations = () => {
  CheckIsMobile();

  const { currentUserData } = useSafeUserContext();
  const { userId } = currentUserData;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [receivers, setReceivers] = useState<any>([]);
  const navigate = useNavigate();

  const newMessage = () => {
    navigate(ROUTES.ROUTE_NEW_MESSAGE);
  };

  useEffect(() => {
    const fetchData = async () => {
      const getConversations = await findConversationsByUserId(userId);
      setConversations(getConversations);
      const receiversData: { [conversationId: string]: User } = {};
      for (const conversation of getConversations) {
        const receiverData = await getReceiverData(
          userId,
          conversation.conversationId
        );
        receiversData[conversation.conversationId] = receiverData;
      }
      setReceivers(receiversData);
    };

    fetchData();

    const timer = setInterval(fetchData, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.messages}>
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
        <ul className={styles.list}>
          {conversations.length > 0 &&
          conversations.some((conversation) => conversation.lastMessage) ? (
            conversations.map((conversation) => {
              const receiver = receivers[conversation.conversationId] as User;

              return (
                <div
                  key={conversation.conversationId}
                  className={styles.list__item}
                >
                  {receiver ? (
                    <List data={receiver} typeOfList="conversationList" />
                  ) : (
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
                  )}
                </div>
              );
            })
          ) : (
            <div className={styles.list__empty}>
              <p>Can't find any conversations.</p>
              <PiEmpty size={48} />
            </div>
          )}
        </ul>
      </div>
      <NavigationMobile />
    </section>
  );
};

export default Conversations;
