import { useState } from "react";
import { useSafeUserContext } from "../../../../../context/AuthenticationContext";
import UpdateUsername from "./UpdateInfo";

import styles from "./Account.module.scss";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";

const Account = () => {
  const [isAccountSettingsActive, setIsAccountSettingsActive] = useState(false);

  const { user } = useSafeUserContext();

  console.log(user);

  return (
    <section className={styles.container}>
      <div>
        <button
          type="button"
          onClick={() => setIsAccountSettingsActive(!isAccountSettingsActive)}
          className={styles.button}
        >
          <p>Details</p>
          {isAccountSettingsActive ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </button>
        {isAccountSettingsActive && <UpdateUsername />}
      </div>
    </section>
  );
};

export default Account;
