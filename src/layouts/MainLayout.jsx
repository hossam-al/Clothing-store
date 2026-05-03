import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
