import { TailSpin } from "react-loader-spinner";
import styles from "./spinner.module.css";
const Spinner = () => {
  return (
    <div className={styles.container}>
      <TailSpin height={80} width={80} color="#333333" />
    </div>
  );
};

export default Spinner;
