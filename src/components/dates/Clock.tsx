import { DateTime } from "luxon";

import styles from "./Clock.module.scss";
import { useEffect, useMemo, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(DateTime.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now());
    }, 5000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [time]);

  const formattedTime = useMemo(() => {
    const hourTime = time.toFormat("hh");
    const minuteTime = time.toFormat("mm");

    return `${hourTime}:${minuteTime}`;
  }, [time]);

  return (
    <div className={styles.clock}>
      <p className={styles.clock__text}>{formattedTime}</p>
    </div>
  );
};

export default Clock;
