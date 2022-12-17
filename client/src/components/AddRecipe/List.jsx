import { useState } from "react";
import styles from "./addRecipe.module.css";

const List = ({ title, placeholder, itemsArray, setItemsArray }) => {
  const [itemInput, setItemInput] = useState("");
  const handleDeleteItem = (itemIndex) => {
    const updateList = [...itemsArray].filter(
      (item, index) => index !== itemIndex
    );
    setItemsArray(updateList);
  };

  return (
    <div className={styles.list}>
      <div className={styles.list__input_container}>
        <label htmlFor="item" className={styles.label}>
          {title}
        </label>
        <input
          type="text"
          name="item"
          placeholder={placeholder}
          className={styles.input}
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setItemsArray((prevValue) => [...prevValue, itemInput]);
            setItemInput("");
          }}
          className={styles.addBtn}
        >
          Add
        </button>
      </div>
      {itemsArray.length >= 1 && (
        <div className={styles.listItems}>
          {itemsArray.map((item, index) => (
            <div key={item} className={styles.item}>
              <p> {item} </p>
              <span onClick={() => handleDeleteItem(index)}>X</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
