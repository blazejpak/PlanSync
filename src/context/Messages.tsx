import { createContext, ReactNode, useContext, useState } from "react";

import { Conversation } from "../types/messages";

interface initialValueProps {
  conversations: Conversation[];
  isConversationsOpen: boolean;
  isConversationOpen: boolean;
  conversationId: string;

  changeConversationsData: (value: Conversation[]) => void;
  changeIsConversationsOpen: () => void;
  changeIsConversationOpen: () => void;
  changeConversationId: (value: string) => void;
}

const initialValue: initialValueProps = {
  conversations: [],
  isConversationsOpen: false,
  isConversationOpen: false,
  conversationId: "",

  changeConversationsData: () => {},
  changeIsConversationsOpen: () => {},
  changeIsConversationOpen: () => {},
  changeConversationId: () => {},
};

export const MessagesStatesContext = createContext(initialValue);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const MessagesStatesProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [isConversationsOpen, setIsConversationsOpen] = useState(
    initialValue.isConversationsOpen
  );
  const [isConversationOpen, setIsConversationOpen] = useState(
    initialValue.isConversationOpen
  );
  const [conversationId, setConversationId] = useState(
    initialValue.conversationId
  );
  const [conversations, setConversation] = useState(initialValue.conversations);

  const changeConversationsData = (value: Conversation[]) => {
    setConversation(value);
  };

  const changeConversationId = (value: string) => {
    setConversationId(value);
  };

  const changeIsConversationsOpen = () => {
    setIsConversationsOpen((prev) => !prev);
  };

  const changeIsConversationOpen = () => {
    setIsConversationOpen((prev) => !prev);
  };

  return (
    <MessagesStatesContext.Provider
      value={{
        isConversationsOpen,
        isConversationOpen,
        changeIsConversationsOpen,
        changeIsConversationOpen,
        conversationId,
        changeConversationId,
        conversations,
        changeConversationsData,
      }}
    >
      {children}
    </MessagesStatesContext.Provider>
  );
};

export const useSafeMessagesContext = () => {
  const value = useContext(MessagesStatesContext);
  if (value === undefined) {
    throw new Error("Context value is undefined");
  }
  return value;
};
