import { useLocation } from "react-router-dom";
import { useSafeMobileContext } from "../../../context/MobileStates";

import MobileHome from "./MobileHome";
import MobileModal from "./MobileModal";
import AddTask from "../../../components/modals/AddTask/AddTask";

const Mobile = () => {
  const { typeOfPage } = useSafeMobileContext();

  const path = useLocation().pathname.split("/").pop();

  // return typeOfPage === "home" ? <MobileHome /> : <MobileModal />;

  return <MobileHome />;
};

export default Mobile;
