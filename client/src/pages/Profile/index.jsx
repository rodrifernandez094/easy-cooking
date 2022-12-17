import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Card from "../../components/Card";
import styles from "./profile.module.css";
import DeleteUser from "../../components/Modals/Delete/DeleteUser";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [recipes, setRecipes] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    const getRecipes = async () => {
      try {
        const res = await axios.get(`/recipes?user=${auth?.userName}`, {
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
  }, [auth?.userName]);

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar__container}>
        <ul className={styles.sidebar}>
          <li className={styles.sidebar__greeting}>
            Hi, <span>{auth.userName}</span>
          </li>
          <li className={styles.sidebar__item}>Personal Info</li>
          <li className={styles.sidebar__item}>Profile Settings</li>
          <li
            className={styles.sidebar__item}
            onClick={() => {
              setIsOpen((prevValue) => !prevValue);
            }}
          >
            Delete Account
          </li>
        </ul>
      </aside>
      <section className={styles.recipes__container}>
        <h1>My recipes</h1>
        <div className={styles.content}>
          {recipes?.length > 0 &&
            recipes.map((recipeData) => {
              return <Card recipeData={recipeData} key={recipeData?._id} />;
            })}
        </div>
      </section>
      {isOpen && (
        <DeleteUser
          userName={auth.userName}
          setAuth={setAuth}
          setIsOpen={setIsOpen}
          token={auth.accessToken}
        />
      )}
    </main>
  );
};

export default Profile;
