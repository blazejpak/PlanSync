import {
  addDoc,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAt,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../utils/firebase/firebase";
import { User } from "../types/user";
import { Conversation, Message } from "../types/messages";

export const findUserByName = async (name: string): Promise<User[]> => {
  const userRef = collection(db, "Users");

  const fullNameQuery = query(
    userRef,
    orderBy("fullName"),
    startAt(name),
    endAt(name + "\uf8ff")
  );

  const emailQuery = query(
    userRef,
    orderBy("email"),
    startAt(name),
    endAt(name + "\uf8ff")
  );

  const [emailSnapshot, fullNameSnapshot] = await Promise.all([
    getDocs(fullNameQuery),
    getDocs(emailQuery),
  ]);

  const fullNameResults = fullNameSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      userId: doc.id,
      ...data,
    } as User;
  });

  const emailResults = emailSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      userId: doc.id,
      ...data,
    } as User;
  });

  const results = [
    ...fullNameResults,
    ...emailResults.filter(
      (emailResult) =>
        !fullNameResults.some(
          (fullNameResult) => fullNameResult.userId === emailResult.userId
        )
    ),
  ];

  return results;
};

export const createNewConversation = async (
  sender: string,
  receiver: string
) => {
  const conversationRef = collection(db, "Conversations");

  const conversationQuery = query(
    conversationRef,
    where("participants", "array-contains", sender)
  );

  const conversationSnapshot = await getDocs(conversationQuery);

  const existingConversation = conversationSnapshot.docs.find((doc) =>
    doc.data().participants.includes(receiver)
  );

  if (existingConversation) {
    return existingConversation.id;
  }

  const docRef = await addDoc(conversationRef, {
    participants: [sender, receiver],
    lastMessage: "",
    timestamp: "",
  });

  return docRef.id;
};

export const updateConversation = async (
  conversationId: string,
  lastMessage: string,
  timestamp: string
) => {
  const conversationRef = doc(db, "Conversations", conversationId);

  await updateDoc(conversationRef, {
    lastMessage: lastMessage,
    timestamp: timestamp,
  });
};

export const findConversationsByUserId = async (id: string) => {
  const userRef = collection(db, "Conversations");

  const conversationsQuery = query(
    userRef,
    where("participants", "array-contains", id)
  );

  const conversationsSnapshot = await getDocs(conversationsQuery);

  return conversationsSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      conversationId: doc.id,
      ...data,
    } as Conversation;
  });
};

export const getReceiverData = async (
  senderId: string,
  conversationId: string
) => {
  const conversationRef = doc(db, "Conversations", conversationId);
  const conversationDoc = await getDoc(conversationRef);

  const data = conversationDoc.data() as Conversation;
  const participants = data.participants;
  const receiverId = participants.find((id) => id !== senderId);

  const userRef = collection(db, "Users");
  const userQuery = query(userRef, where("userId", "==", receiverId));

  const userSnapshot = await getDocs(userQuery);
  const userData = userSnapshot.docs[0].data();

  return userData as User;
};

export const getMessages = (
  conversationId: string,
  updateData: (messages: Message[]) => void
) => {
  const messagesRef = collection(db, "Messages");

  const messagesQuery = query(
    messagesRef,
    where("conversationId", "==", conversationId),
    orderBy("timestamp", "asc")
  );

  console.log(messagesQuery);

  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      messages.push({
        messageId: doc.id,
        ...doc.data(),
      } as Message);
    });
    console.log(messages);
    updateData(messages);
  });

  return unsubscribe;
};

export const sendMessage = async (
  message: Omit<Message, "messageId" | "timestamp">
) => {
  const messagesRef = collection(db, "Messages");

  const addMessage = await addDoc(messagesRef, {
    conversationId: message.conversationId,
    senderId: message.senderId,
    receiverId: message.receiverId,
    messageContent: message.messageContent,
    timestamp: serverTimestamp(),
  });

  const messageSnapshot = await getDoc(addMessage);
  const messageData = messageSnapshot.data();

  return {
    ...messageData,

    messageId: addMessage.id,
    timestamp: messageData?.timestamp,
  } as Message;
};
