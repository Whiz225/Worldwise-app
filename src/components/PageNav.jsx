import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "../pages/Logo";
// import MobileMenu from "./MobileMenu"; // Import the mobile menu

function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo />

      {/* Desktop navigation */}
      <ul className={style.desktopNav}>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={style.ctaLink}>
            login
          </NavLink>
        </li>
      </ul>

      {/* Mobile menu */}
      {/* <MobileMenu /> */}
    </nav>
  );
}

export default PageNav;

// import { NavLink } from "react-router-dom";
// import style from "./PageNav.module.css";
// import Logo from "../pages/Logo";

// function PageNav() {
//   return (
//     <nav className={style.nav}>
//       <Logo />
//       <ul>
//         <li>
//           <NavLink to="/pricing">pricing</NavLink>
//         </li>
//         <li>
//           <NavLink to="/product">product</NavLink>
//         </li>
//         <li>
//           <NavLink to="/login" className={style.ctaLink}>
//             login
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default PageNav;
