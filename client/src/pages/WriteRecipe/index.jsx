import AddRecipe from "../../components/AddRecipe";
import styles from "./writeRecipe.module.css";

const WriteRecipe = () => {
  return (
    <main className={styles.container}>
      <section className={styles.heading}>
        <h1>Write Recipe!</h1>
        <p className={styles.heading__subtitle}>
          Uploading personal recipes is easy! Add yours to your favorites, share
          with friends, family, or the Easy Cooking community.
        </p>
      </section>
      <AddRecipe />
    </main>
  );
};

export default WriteRecipe;
