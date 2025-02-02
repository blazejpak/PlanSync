import Chat from "../../../../components/messages/Chat";
import { useSafeMessagesContext } from "../../../../context/Messages";

import styles from "./Conversation.module.scss";

const Conversation = () => {
  const {
    changeIsConversationOpen,
    changeIsConversationsOpen,
    isConversationsOpen,
    isConversationOpen,
    conversationId,
  } = useSafeMessagesContext();

  const back = () => {
    if (isConversationOpen && !isConversationsOpen) {
      changeIsConversationOpen();
      changeIsConversationsOpen();
    }
  };

  return (
    <section className={styles.container}>
      <Chat back={back} conversationId={conversationId} />
    </section>
  );
};

export default Conversation;
