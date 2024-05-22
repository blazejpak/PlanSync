import HomeNav from "./HomeNav";

import styles from "./Home.module.scss";
import HomeContent from "./HomeContent";
import HomeFooter from "./HomeFooter";

const Home = () => {
  return (
    <div className={styles.container}>
      <HomeNav />
      <HomeContent />
      <HomeFooter />
    </div>
  );
};

export default Home;
