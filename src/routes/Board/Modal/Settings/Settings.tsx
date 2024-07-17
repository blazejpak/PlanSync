import Overlay from "../Overlay";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import Application from "./Application";
import Account from "./Account";

const Settings = () => {
  return (
    <Overlay>
      <div>
        <strong>Settings</strong>
        <div>
          <button type="button" onClick={() => {}}>
            <p>Application</p>
            <FaArrowLeft size={16} />
          </button>
          <Application />
        </div>

        {/* <div>
          <button type="button" onClick={() => {}}>
            <p>Account</p>
            <FaArrowLeft size={16} />
          </button>
          <Account />
        </div> */}
      </div>
    </Overlay>
  );
};

export default Settings;
