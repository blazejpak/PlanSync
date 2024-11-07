import Input from "../../../components/form/Input";

import { FaPen } from "react-icons/fa6";
import styles from "./Messeges.module.scss";

const Messages = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Chats</h1>
        <button className={styles.button}>
          <FaPen size={24} />
        </button>
      </div>
      <div>
        <Input
          id="message"
          name="message"
          label=""
          placeholder="Search..."
          required={false}
          type="text"
          onChange={() => {}}
        />
      </div>
      <div className={styles.messages}></div>
    </section>
  );
};

export default Messages;
