import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MobileMenu.module.css";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileMenu}>
      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <div className={styles.menuOverlay} onClick={() => setIsOpen(false)}>
          <nav
            className={styles.menuContent}
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li>
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/pricing" onClick={() => setIsOpen(false)}>
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink to="/product" onClick={() => setIsOpen(false)}>
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={styles.ctaLink}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
