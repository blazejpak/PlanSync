import Nav from "./Nav";

import styles from "./Home.module.scss";
import Content from "./Content";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className={styles.container}>
      <Nav />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
