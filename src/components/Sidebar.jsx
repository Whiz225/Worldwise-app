import { Outlet } from "react-router-dom";
import Logo from "../pages/Logo";
import AppNav from "./AppNav";
import styles from "./sidebar.module.css";

function sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc
        </p>
      </footer>
    </div>
  );
}

export default sidebar;
