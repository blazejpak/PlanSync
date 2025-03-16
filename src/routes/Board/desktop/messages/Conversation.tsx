import { useRef } from "react";
import Chat from "../../../../components/messages/Chat";
import { useSafeMessagesContext } from "../../../../context/Messages";

import styles from "./Conversation.module.scss";
import useClickOutside from "../../../../hooks/useClickOutside";
import OverlayWhite from "../../../../components/boxes/OverlayWhite";

const Conversation = () => {
  const {
    changeIsConversationOpen,
    changeIsConversationsOpen,
    isConversationsOpen,
    isConversationOpen,
    conversationId,
  } = useSafeMessagesContext();

  const chatRef = useRef<HTMLDivElement>(null);

  const back = () => {
    if (isConversationOpen && !isConversationsOpen) {
      changeIsConversationOpen();
      changeIsConversationsOpen();
    }
  };

  useClickOutside({ ref: chatRef, callback: changeIsConversationOpen });

  return (
    <OverlayWhite>
      <section className={styles.container} ref={chatRef}>
        <Chat back={back} conversationId={conversationId} />
      </section>
    </OverlayWhite>
  );
};

export default Conversation;
