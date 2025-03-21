import { useSafeUserContext } from "../../../../context/AuthenticationContext";

import Indentation from "../Indentation";
import styles from "./PersonalData.module.scss";

const PersonalData = () => {
  const { currentUserData } = useSafeUserContext();

  const fullName = currentUserData.fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Indentation>
      <section className={styles.container}>
        <div>
          <strong>Email:</strong>
          <p>{currentUserData.email}</p>
        </div>
        <div>
          <strong>Full name:</strong>
          <p>
            {fullName ? fullName : "You haven't entered your full name yet."}
          </p>
        </div>
        <div>
          <strong>Phone number</strong>
          <p>
            {currentUserData.phoneNumber
              ? currentUserData.phoneNumber
              : "You haven't entered your phone number yet."}
          </p>
        </div>
      </section>
    </Indentation>
  );
};

export default PersonalData;
