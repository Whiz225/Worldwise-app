// import { Outlet, useLocation } from "react-router-dom";
// import { useState } from "react";
// import styles from "./MobileLayout.module.css";
// import Logo from "../pages/Logo";
// import BackButton from "../components/BackButton";

// function MobileLayout() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   // Determine which page to show
//   const showMap =
//     location.pathname === "/app" || location.pathname === "/app/cities";
//   const showCountries = location.pathname.includes("/app/countries");
//   const showForm = location.pathname.includes("/app/form");
//   const showCityDetails = location.pathname.includes("/app/cities/");

//   return (
//     <div className={styles.mobileContainer}>
//       {/* Header */}
//       <header className={styles.header}>
//         <button
//           className={styles.menuButton}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//         <Logo />
//         <div className={styles.headerTitle}>
//           {showCountries && "Countries"}
//           {showForm && "Add City"}
//           {showCityDetails && "City Details"}
//           {(showMap || (!showCountries && !showForm && !showCityDetails)) &&
//             "WorldWise"}
//         </div>
//       </header>

//       {/* Sidebar Menu (Drawer) */}
//       <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.open : ""}`}>
//         <div className={styles.menuHeader}>
//           <h2>Menu</h2>
//           <button onClick={() => setIsMenuOpen(false)}>✕</button>
//         </div>
//         <nav className={styles.mobileNav}>
//           <ul>
//             <li>
//               <a href="/app/cities">🏙️ Cities</a>
//             </li>
//             <li>
//               <a href="/app/countries">🌍 Countries</a>
//             </li>
//             <li>
//               <a href="/app/form">➕ Add City</a>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Overlay for menu */}
//       {isMenuOpen && (
//         <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
//       )}

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         {/* Show back button except on main map view */}
//         {(showCountries || showForm || showCityDetails) && (
//           <div className={styles.backButtonContainer}>
//             <BackButton />
//           </div>
//         )}

//         {/* Render the appropriate content */}
//         <div className={styles.contentArea}>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default MobileLayout;
