import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MobileNavigation.module.css";

function MobileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.mobileNav}>
      <button
        className={`${styles.navButton} ${
          isActive("/app/map") ? styles.active : ""
        }`}
        onClick={() => navigate("map")}
      >
        <span className={styles.icon}>🗺️</span>
        <span>Map</span>
      </button>

      <button
        className={`${styles.navButton} ${
          isActive("/app/cities") ? styles.active : ""
        }`}
        onClick={() => navigate("cities")}
      >
        <span className={styles.icon}>🏙️</span>
        <span>Cities</span>
      </button>

      <button className={styles.addButton} onClick={() => navigate("form")}>
        <span className={styles.addIcon}>+</span>
      </button>

      <button
        className={`${styles.navButton} ${
          isActive("/app/countries") ? styles.active : ""
        }`}
        onClick={() => navigate("countries")}
      >
        <span className={styles.icon}>🌍</span>
        <span>Countries</span>
      </button>
    </div>
  );
}

export default MobileNavigation;
