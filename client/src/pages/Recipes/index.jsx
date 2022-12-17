import styles from "./recipes.module.css";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Card from "../../components/Card";

const Reciples = () => {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    let controller = new AbortController();
    const getRecipes = async () => {
      try {
        const res = await axios.get("/recipes", {
          signal: controller.signal,
        });
        const data = await res.data;
        setRecipes(data.recipes);
        controller = null;
      } catch (error) {
        console.error(error);
      }
    };

    getRecipes();
    return () => controller?.abort();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        {recipes?.length > 0 &&
          recipes.map((recipeData) => {
            return <Card recipeData={recipeData} key={recipeData?._id} />;
          })}
      </section>
    </main>
  );
};

export default Reciples;
