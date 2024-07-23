import { useState } from "react";
import { useSafeUserContext } from "../../../../../context/AuthenticationContext";
import UpdateUsername from "./UpdateInfo";

import styles from "./Account.module.scss";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import ChangePassword from "./ChangePassword";

const Account = () => {
  const [isAccountSettingsActive, setIsAccountSettingsActive] = useState(false);
  const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);

  const { user } = useSafeUserContext();
  if (!user) return;

  console.log(user);
  console.log(user.providerData[0].providerId);

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
      {user.providerData[0].providerId !== "google.com" && (
        <div>
          <button
            type="button"
            onClick={() => setIsChangePasswordActive(!isChangePasswordActive)}
            className={styles.button}
          >
            <p>Change password</p>
            {isChangePasswordActive ? (
              <FaArrowDown size={16} />
            ) : (
              <FaArrowLeft size={16} />
            )}
          </button>
          {isChangePasswordActive && <ChangePassword />}
        </div>
      )}
    </section>
  );
};

export default Account;
