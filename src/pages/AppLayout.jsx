import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import MobileNavigation from "../components/MobileNavigation";

function AppLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
      {isMobile && <MobileNavigation />}
    </div>
  );
}

export default AppLayout;

// import Sidebar from "../components/Sidebar";
// import Map from "../components/Map";
// import styles from "./AppLayout.module.css";
// import User from "../components/User";

// function AppLayout() {
//   return (
//     <div className={styles.app}>
//       <User />
//       <Sidebar />
//       <Map />
//     </div>
//   );
// }

// export default AppLayout;
