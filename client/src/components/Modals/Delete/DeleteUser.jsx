import styles from "./modal.module.css";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const DeleteUser = ({ userName, setAuth, setIsOpen, token }) => {
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/users/${userName}`, {
        headers: {
          authorization: token,
        },
      });

      setAuth(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <p>Are you sure you want to delete your account?</p>
        <p>This action cannot be undone.</p>
        <div className={styles.btn__container}>
          <button onClick={handleDeleteUser} className={styles.btn}>
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

export default DeleteUser;
