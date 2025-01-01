import Chat from "../../../../components/messages/Chat";
import { useSafeMessagesContext } from "../../../../context/Messages";

const Conversation = () => {
  const {
    changeIsConversationOpen,
    changeIsChatOpen,
    isChatOpen,
    isConversationOpen,
    conversationId,
  } = useSafeMessagesContext();

  const back = () => {
    if (isConversationOpen && !isChatOpen) {
      changeIsConversationOpen();
      changeIsChatOpen();
    }
  };

  return <Chat back={back} conversationId={conversationId} />;
};

export default Conversation;
