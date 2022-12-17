import styles from "./home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.hero__headings}>
          <h1 className={styles.title}>Easy Recipes, delicious food.</h1>
        </div>
        <Link to="/recipes" className={styles.hero__btn}>
          View Recipes
        </Link>
      </section>
    </main>
  );
};

export default Home;
