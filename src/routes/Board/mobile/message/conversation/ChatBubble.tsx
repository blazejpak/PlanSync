import { DateTime } from "luxon";
import { Message } from "../../../../../types/messages";
import styles from "./ChatBubble.module.scss";
import { useSafeUserContext } from "../../../../../context/AuthenticationContext";
import { useState } from "react";

type ChatBubbleProps = {
  data: Message;
};

const ChatBubble = ({ data }: ChatBubbleProps) => {
  const { currentUserData } = useSafeUserContext();
  const time = DateTime.fromMillis(+data.timestamp).toFormat("HH:mm");
  const [showTime, setShowTime] = useState(false);
  console.log(data);
  return (
    <li
      className={`${styles.container} ${
        currentUserData.userId === data.senderId
          ? styles.sender
          : styles.receiver
      }`}
    >
      <div
        className={`${styles.content} ${
          currentUserData.userId === data.senderId
            ? styles.sender
            : styles.receiver
        }`}
        onClick={() => setShowTime((prev) => !prev)}
      >
        <p>{data.messageContent}</p>
      </div>
      {showTime && <p className={styles.time}>{time}</p>}
    </li>
  );
};

export default ChatBubble;
