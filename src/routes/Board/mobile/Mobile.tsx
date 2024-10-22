import { useSafeMobileContext } from "../../../context/MobileStates";

import MobileHome from "./MobileHome";
import MobileModal from "./MobileModal";

const Mobile = () => {
  const { typeOfPage } = useSafeMobileContext();

  return typeOfPage === "home" ? <MobileHome /> : <MobileModal />;
};

export default Mobile;
