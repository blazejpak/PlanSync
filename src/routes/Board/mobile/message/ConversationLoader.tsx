import { LoaderFunctionArgs } from "react-router-dom";
import { findConversationsByUserId } from "../../../../services/messageService";

const ConversationLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;
  if (!userId) throw new Error("User ID is required");

  const getConversations = await findConversationsByUserId(userId);

  return getConversations;
};

export default ConversationLoader;
