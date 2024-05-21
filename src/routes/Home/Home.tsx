import HomeNav from "./HomeNav";

import styles from "./Home.module.scss";
import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <div className={styles.container}>
      <HomeNav />
      <HomeContent />
    </div>
  );
};

export default Home;
