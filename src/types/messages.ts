import { Timestamp } from "firebase/firestore";

export type Message = {
  messageId: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  messageContent: string;
  timestamp: Timestamp;
};

export type Conversation = {
  conversationId: string;
  participants: string[];
  lastMessage: string;
  timestamp: string;
};
