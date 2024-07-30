import logo from "../../assets/logo.webp";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const HomeFooter = () => {
  const logoLink = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles["left-part"]}>
        <Link to={ROUTES.ROUTE_HOME} onClick={logoLink}>
          <img src={logo} height={48} alt="Logo" className={styles.image} />
        </Link>
        <p className={styles.description}>
          PlanSync is a task management app designed to streamline your workflow
          and help you achieve your goals, all without feeling overwhelmed.
          Unlike some complex project management tools, PlanSync focuses on
          simplicity and ease of use. This app is the perfect solution for
          anyone who wants to achieve more with less stress. It's a simple,
          intuitive app that empowers you to take control of your tasks, track
          progress, and ultimately, achieve your goals.
        </p>
      </div>
      <div className={styles["right-part"]}>
        <p className={styles.copyright}>Copyright 2024. All Rights Reserved</p>

        <div className={styles.links}>
          <a
            href="https://github.com/blazejpak"
            target="_blank"
            aria-label="Facebook link"
          >
            <AiFillFacebook size={24} />
          </a>
          <a
            href="https://github.com/blazejpak"
            aria-label="Facebook link"
            target="_blank"
          >
            <FaXTwitter size={24} />
          </a>
          <a
            href="https://github.com/blazejpak"
            aria-label="Instagram link"
            target="_blank"
          >
            <AiFillInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
