import { ChangeEvent, useEffect, useState } from "react";
import { useSafeUserContext } from "../../../../context/AuthenticationContext";
import { useSafeMessagesContext } from "../../../../context/Messages";
import { Conversation } from "../../../../types/messages";
import {
  getReceiverData,
  subscribeConversationsByUserId,
} from "../../../../services/messageService";
import { User } from "../../../../types/user";

import styles from "./Messages.module.scss";
import Input from "../../../../components/form/Input";
import { Skeleton } from "@mui/material";
import List from "../../../../components/messages/List";
import { PiEmpty } from "react-icons/pi";
import { useAppSelector } from "../../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../../store/reducers/statistics";

const Messages = () => {
  const { currentUserData } = useSafeUserContext();
  const { conversations, changeConversationsData } = useSafeMessagesContext();
  const isStatsOpen = useAppSelector(selectIsStatisticsOpen);
  const { userId } = currentUserData;
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);
  const [receivers, setReceivers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeConversationsByUserId(userId, (data) => {
      changeConversationsData(data);
      setFilteredConversations(data);
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
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
    <div className={`${styles.container} ${isStatsOpen && styles.open}`}>
      <div>
        <h1>
          <span>Chats</span>
        </h1>
      </div>

      <Input
        id="message"
        name="message"
        label=""
        placeholder="Search..."
        required={false}
        type="text"
        onChange={findConversations}
      />

      {isLoading ||
      !conversations.length ||
      Object.keys(receivers).length === 0 ? (
        Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={100}
              style={{ marginTop: "2rem" }}
            />
          ))
      ) : (
        <ul className={styles.list}>
          {filteredConversations.length > 0 &&
          filteredConversations.some(
            (conversation) => conversation.lastMessage
          ) ? (
            filteredConversations.map((conversation) => {
              const receiver = receivers[conversation.conversationId] as User;

              return (
                <div
                  key={conversation.conversationId}
                  className={styles.list__item}
                >
                  {receiver && (
                    <List data={receiver} typeOfList="conversationList" />
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
      )}
    </div>
  );
};

export default Messages;
