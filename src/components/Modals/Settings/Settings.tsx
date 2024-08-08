import Overlay from "../Overlay";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import Application from "./Application/Application";
import Account from "./Account/Account";
import { useState } from "react";

import styles from "./Settings.module.scss";

const Settings = () => {
  const [isAppOptionsActive, setIsAppOptionsActive] = useState(false);
  const [isAccountOptionsActive, setIsAccountOptionsActive] = useState(false);

  return (
    <Overlay>
      <div className={styles.container}>
        <strong className={styles.heading}>Settings</strong>
        <div>
          <button
            type="button"
            onClick={() => setIsAppOptionsActive(!isAppOptionsActive)}
            className={styles.button}
          >
            <p>Application</p>
            {isAppOptionsActive ? (
              <FaArrowDown size={16} />
            ) : (
              <FaArrowLeft size={16} />
            )}
          </button>
          {isAppOptionsActive && <Application />}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsAccountOptionsActive(!isAccountOptionsActive)}
            className={styles.button}
          >
            <p>Account</p>
            {isAccountOptionsActive ? (
              <FaArrowDown size={16} />
            ) : (
              <FaArrowLeft size={16} />
            )}
          </button>
          {isAccountOptionsActive && <Account />}
        </div>
      </div>
    </Overlay>
  );
};

export default Settings;
