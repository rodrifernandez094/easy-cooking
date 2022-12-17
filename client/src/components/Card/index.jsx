import styles from "./card.module.css";
import { Link } from "react-router-dom";
import {
  faEllipsis,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DeleteRecipe from "../Modals/Delete/DeleteRecipe";
import useAuth from "../../hooks/useAuth";

const Card = ({ recipeData }) => {
  const description = recipeData?.description;
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useAuth();

  return (
    <>
      <div className={styles.card}>
        {auth.userName === recipeData?.userName && (
          <FontAwesomeIcon
            icon={faEllipsis}
            className={styles.dropdown__btn}
            size={"lg"}
            onClick={() => setDropdown((prevValue) => !prevValue)}
          />
        )}

        <img className={styles.image} src={recipeData?.image} alt="dish" />
        <div className={styles.card__text}>
          <Link to={`/recipes/${recipeData?._id}`}>
            <h2 className={styles.card__title}> {recipeData?.title} </h2>
          </Link>
          <p className={styles.card__description}>
            {description.slice(0, 30)}...
          </p>
          <p className={styles.card__description}>By {recipeData?.userName}</p>
        </div>
        {dropdown && (
          <div className={styles.dropdown}>
            <div className={styles.dropdown__item}>
              <FontAwesomeIcon icon={faTrashCan} />
              <span onClick={() => setIsOpen((prevValue) => !prevValue)}>
                Delete
              </span>
            </div>
            <div className={styles.dropdown__item}>
              <FontAwesomeIcon icon={faPen} />
              <span>Edit</span>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <DeleteRecipe
          recipeId={recipeData?._id}
          setIsOpen={setIsOpen}
          token={auth.accessToken}
        />
      )}
    </>
  );
};

export default Card;
