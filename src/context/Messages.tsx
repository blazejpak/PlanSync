import { createContext, ReactNode, useContext, useState } from "react";

import { Conversation } from "../types/messages";

interface initialValueProps {
  conversations: Conversation[];
  isChatOpen: boolean;

  changeConversationsData: (value: Conversation[]) => void;
  changeIsChatOpen: () => void;
}

const initialValue: initialValueProps = {
  conversations: [],
  isChatOpen: false,

  changeConversationsData: () => {},
  changeIsChatOpen: () => {},
};

export const MessagesStatesContext = createContext(initialValue);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const MessagesStatesProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [isChatOpen, setIsChatOpen] = useState(initialValue.isChatOpen);
  const [conversations, setConversation] = useState(initialValue.conversations);

  const changeConversationsData = (value: Conversation[]) => {
    setConversation(value);
  };

  const changeIsChatOpen = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <MessagesStatesContext.Provider
      value={{
        isChatOpen,
        changeIsChatOpen,
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
