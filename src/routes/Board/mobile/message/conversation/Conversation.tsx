import { useNavigate, useParams } from "react-router-dom";

import { useSafeUserContext } from "../../../../../context/AuthenticationContext";

import { ROUTES } from "../../../../../types/routes";
import { GetSettingsData } from "../../../../../helpers/GetSettingsData";
import useCheckIsMobile from "../../../../../hooks/useCheckIsMobile";
import Chat from "../../../../../components/messages/Chat";

const Conversation = () => {
  const { currentUserData } = useSafeUserContext();
  useCheckIsMobile();
  GetSettingsData();
  const navigate = useNavigate();

  const { conversationId } = useParams<{ conversationId: string }>();
  if (!conversationId) return null;

  const back = () => {
    navigate(ROUTES.ROUTE_MESSAGES(currentUserData.userId));
  };

  return <Chat back={back} conversationId={conversationId} />;
};

export default Conversation;
