import Navbar from "./Navbar";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.app}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
