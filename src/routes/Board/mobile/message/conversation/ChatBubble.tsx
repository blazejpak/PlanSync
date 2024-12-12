import { Message } from "../../../../../types/messages";
import styles from "./ChatBubble.module.scss";

type ChatBubbleProps = {
  data: Message;
};

const ChatBubble = ({ data }: ChatBubbleProps) => {
  console.log(data);
  return <li>{data.messageContent}</li>;
};

export default ChatBubble;
