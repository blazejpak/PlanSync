import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";
import { ProfilePhoto } from "../../helpers/ProfilePhoto";
import ChatBubble from "../../routes/Board/mobile/message/conversation/ChatBubble";
import { IoSend } from "react-icons/io5";

import styles from "./Chat.module.scss";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getMessages,
  getReceiverData,
  sendMessage,
  updateConversation,
} from "../../services/messageService";
import { useSafeUserContext } from "../../context/AuthenticationContext";
import { User } from "../../types/user";
import { Message } from "../../types/messages";

type ChatProps = {
  conversationId: string;
  back: () => void;
};

const Chat = ({ conversationId, back }: ChatProps) => {
  const { currentUserData } = useSafeUserContext();
  const [data, setData] = useState<Message[]>([]);
  const [receiver, setReceiver] = useState<User>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messageText, setMessageText] = useState("");
  const chatRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    const fetchData = async () => {
      if (currentUserData.userId) {
        const receiverData = await getReceiverData(
          currentUserData.userId,
          conversationId
        );
        setReceiver(receiverData);
      }
    };
    fetchData();
  }, [currentUserData.userId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [data.length]);

  useEffect(() => {
    const unsubscribe = getMessages(conversationId, setData);
    return () => unsubscribe();
  }, [conversationId]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setMessageText(textarea.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessageSubmit(
        new Event("submit") as unknown as FormEvent<HTMLFormElement>
      );
    }
  };

  const sendMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (receiver?.userId && currentUserData.userId && messageText.trim()) {
      const message = await sendMessage({
        conversationId,
        messageContent: messageText,
        senderId: currentUserData.userId,
        receiverId: receiver.userId,
      });

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      const timestamp = message.timestamp;

      await updateConversation(conversationId, messageText, timestamp);

      setMessageText("");
    }
  };

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
      <ul className={styles.list} ref={chatRef}>
        {data.map((message) => {
          return <ChatBubble key={message.messageId} data={message} />;
        })}
      </ul>
      <form onSubmit={sendMessageSubmit} className={styles.form}>
        <textarea
          className={styles.input}
          value={messageText}
          onChange={handleInputChange}
          rows={1}
          placeholder="Write a message..."
          ref={textareaRef}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">
          <IoSend />
        </button>
      </form>
    </section>
  );
};

export default Chat;
