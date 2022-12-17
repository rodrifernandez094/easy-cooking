import styles from "./modal.module.css";
import axios from "../../../api/axios";

const DeleteRecipe = ({ recipeId, setIsOpen, token }) => {
  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`/recipes/${recipeId}`, {
        headers: {
          authorization: token,
        },
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <p>Are you sure you want to delete this recipe?</p>
        <div className={styles.btn__container}>
          <button onClick={handleDeleteRecipe} className={styles.btn}>
            Delete
          </button>
          <button
            onClick={() =>
              setIsOpen((prevState) => {
                return !prevState;
              })
            }
            className={styles.btn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecipe;
