import Chat from "../../../../components/messages/Chat";
import OverlayWhite from "../../../../components/modals/OverlayWhite";
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
    <OverlayWhite>
      <section className={styles.container}>
        <Chat back={back} conversationId={conversationId} />
      </section>
    </OverlayWhite>
  );
};

export default Conversation;
