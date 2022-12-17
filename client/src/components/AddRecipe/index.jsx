import { useState, useEffect } from "react";
import styles from "./addRecipe.module.css";
import List from "./List";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [prepInfo, setPrepInfo] = useState({});
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setRecipe((prevValue) => {
      return {
        ...prevValue,
        ingredients,
        steps,
        userName: auth.userName,
        prepInfo,
      };
    });
  }, [steps, ingredients, auth.userName, prepInfo]);

  const handleSendRecipe = async () => {
    try {
      await axios.post("/recipes/new", recipe);
      navigate("/recipes");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form}>
      <label htmlFor="title" className={styles.label}>
        Dish Title
      </label>
      <input
        type="text"
        name="title"
        placeholder="Dish title"
        required
        className={styles.input}
        onChange={(e) =>
          setRecipe((prevValue) => {
            return { ...prevValue, title: e.target.value };
          })
        }
      />
      <label htmlFor="image" className={styles.label}>
        Image
      </label>
      <input
        type="text"
        name="image"
        placeholder="e.g. imgur.com/image"
        required
        className={styles.input}
        onChange={(e) =>
          setRecipe((prevValue) => {
            return { ...prevValue, image: e.target.value };
          })
        }
      />
      <label htmlFor="description" className={styles.label}>
        Description
      </label>
      <textarea
        placeholder="Share what makes your dish special!"
        name="description"
        cols="30"
        rows="10"
        className={styles.input}
        required
        onChange={(e) =>
          setRecipe((prevValue) => {
            return { ...prevValue, description: e.target.value };
          })
        }
      ></textarea>

      {/* prep info */}
      <fieldset className={styles.list__input_container}>
        <label htmlFor="prep time" className={styles.label}>
          Prep Time
        </label>
        <input
          type="text"
          name="prep time"
          className={styles.input}
          placeholder="e.g. 15 mins"
          required
          onChange={(e) =>
            setPrepInfo((prevValue) => {
              return { ...prevValue, prepTime: e.target.value };
            })
          }
        />
        <label htmlFor="cook time" className={styles.label}>
          Cook Time
        </label>
        <input
          type="text"
          name="cook time"
          className={styles.input}
          placeholder="e.g. 35 mins"
          required
          onChange={(e) =>
            setPrepInfo((prevValue) => {
              return { ...prevValue, cookTime: e.target.value };
            })
          }
        />
        <label htmlFor="servings" className={styles.label}>
          Servings
        </label>
        <input
          type="text"
          name="servings"
          className={styles.input}
          placeholder="e.g. 4 servings"
          required
          onChange={(e) =>
            setPrepInfo((prevValue) => {
              return { ...prevValue, servings: e.target.value };
            })
          }
        />
      </fieldset>
      {/* ingredients */}
      <fieldset className={styles.list__container}>
        <h2 className={styles.list__container_title}>Add ingredients</h2>
        <p className={styles.list__container_subtitle}>
          Enter one ingredient per line. Include the quantity (i.e. cups,
          tablespoons) and any special preparation (i.e. sifted, softened,
          chopped).
        </p>
        <List
          title={"Ingredients"}
          placeholder={"e.g. 2 cups of sugar"}
          itemsArray={ingredients}
          setItemsArray={setIngredients}
        />
      </fieldset>
      {/* steps */}
      <fieldset className={styles.list__container}>
        <h2 className={styles.list__container_title}>Directions</h2>
        <p className={styles.list__container_subtitle}>
          Explain how to make your recipe, including oven temperatures, baking
          or cooking times, and pan sizes, etc. Use optional headers to organize
          the different parts of the recipe (Be mindful of the order).
        </p>
        <List
          title={"Steps"}
          placeholder={"e.g. blend the ingredients..."}
          itemsArray={steps}
          setItemsArray={setSteps}
        />
      </fieldset>
      <button
        className={styles.form__btn}
        onClick={(e) => {
          e.preventDefault();
          handleSendRecipe();
        }}
      >
        Send Recipe
      </button>
    </form>
  );
};

export default AddRecipe;
