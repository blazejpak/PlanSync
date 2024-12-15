import Input from "../../../../components/form/Input";

import { FaPen } from "react-icons/fa6";
import { PiEmpty } from "react-icons/pi";
import styles from "./Conversations.module.scss";

import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../types/routes";
import NavigationMobile from "../../../../components/navigation/NavigationMobile";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getReceiverData,
  subscribeConversationsByUserId,
} from "../../../../services/messageService";
import { Conversation } from "../../../../types/messages";
import { User } from "../../../../types/user";
import List from "./List";
import { Skeleton } from "@mui/material";
import { CheckIsMobile } from "../../../../helpers/CheckIsMobile";

const Conversations = () => {
  CheckIsMobile();
  const { userId } = useParams<{ userId: string }>();
  if (!userId) return null;

  const loaderData = useLoaderData() as Conversation[];

  const [conversations, setConversations] =
    useState<Conversation[]>(loaderData);
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);
  const [receivers, setReceivers] = useState<any>([]);
  const navigate = useNavigate();

  const newMessage = () => {
    navigate(ROUTES.ROUTE_NEW_MESSAGE(userId));
  };

  useEffect(() => {
    const unsubscribe = subscribeConversationsByUserId(userId, (data) => {
      setConversations(data);
      setFilteredConversations(data);
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const receiversData: { [conversationId: string]: User } = {};
      for (const conversation of conversations) {
        const receiverData = await getReceiverData(
          userId,
          conversation.conversationId
        );
        receiversData[conversation.conversationId] = receiverData;
      }
      setReceivers(receiversData);
    };
    fetchData();
  }, [conversations.length]);

  const findConversations = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setFilteredConversations(conversations);
      return;
    }

    const filtered = conversations.filter((conversation) => {
      const receiver = receivers[conversation.conversationId] as User;
      if (!receiver) return false;

      const { email, fullName } = receiver;
      return (
        email?.toLowerCase().includes(value) ||
        fullName?.toLowerCase().includes(value)
      );
    });
    setFilteredConversations(filtered);
  };

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
            onChange={findConversations}
          />
        </div>
        <ul className={styles.list}>
          {filteredConversations.length > 0 &&
          filteredConversations.some(
            (conversation) => conversation.lastMessage
          ) ? (
            filteredConversations.map((conversation) => {
              const receiver = receivers[conversation.conversationId] as User;
              console.log(conversation);
              console.log(receiver);
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
