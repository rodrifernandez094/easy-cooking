import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./recipe.module.css";
import {
  faClock,
  faBreadSlice,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Recipe = () => {
  const params = useParams();
  const [recipeData, setRecipeData] = useState();
  useEffect(() => {
    const getRecipe = async () => {
      const response = await axios(`recipes/${params.id}`);
      setRecipeData(response?.data?.recipe);
    };
    getRecipe();
  }, [params.id]);

  return (
    <main className={styles.container}>
      {/* heading */}
      <section className={styles.heading}>
        <h1 className={styles.title}> {recipeData?.title} </h1>
        <p className={styles.description}>{recipeData?.description}</p>
        <p className={styles.userName}>
          Recipe by <span>{recipeData?.userName}</span>
        </p>
      </section>
      {/* prep info */}
      <section className={styles.info}>
        <div className={styles.img__container}>
          <img src={recipeData?.image} alt="Dish" className={styles.img} />
        </div>
        <div className={styles.prepInfo__container}>
          <div className={styles.prepInfo}>
            <span>Prep Time: </span> {recipeData?.prepInfo?.prepTime}
          </div>
          <div className={styles.prepInfo}>
            <span>Cook Time: </span>
            {recipeData?.prepInfo?.cookTime}
          </div>
          <div className={styles.prepInfo}>
            <span>Servings: </span>
            {recipeData?.prepInfo?.servings}
          </div>
          <span className={styles.icon__container}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
          </span>
        </div>
      </section>
      {/* ingredients */}
      <section className={styles.section__container}>
        <h2 className={styles.subtitle}>Ingredients</h2>
        {recipeData?.ingredients && (
          <div>
            {recipeData?.ingredients.map((ingredient) => {
              return (
                <div className={styles.ingredient} key={ingredient}>
                  <FontAwesomeIcon icon={faBreadSlice} />
                  <p> {ingredient} </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* direction */}
      <section className={styles.section__container}>
        <h2 className={styles.subtitle}>Method</h2>
        {recipeData?.steps && (
          <div>
            {recipeData?.steps.map((step, index) => {
              return (
                <div className={styles.step} key={index}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p> {step} </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Recipe;
