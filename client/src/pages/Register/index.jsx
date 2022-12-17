import styles from "./register.module.css";
import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(null);
  const [errors, setErrors] = useState(null);
  const handleRegister = async () => {
    try {
      await axios.post("/register", credentials, {
        withCredentials: true,
      });

      navigate("/login", { replace: true });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} action="">
        <h2 className={styles.form__title}>Sign up</h2>
        <div className={styles.form__control}>
          {errors && <div className={styles.errors}> {errors?.message} </div>}
          <input
            className={styles.input}
            type="text"
            name="userName"
            maxLength="12"
            placeholder="Username"
            onChange={(e) =>
              setCredentials((prevValue) => {
                return { ...prevValue, userName: e.target.value };
              })
            }
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setCredentials((prevValue) => {
                return { ...prevValue, email: e.target.value };
              })
            }
            required
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setCredentials((prevValue) => {
                return { ...prevValue, password: e.target.value };
              })
            }
            required
          />
          <button
            className={styles.form__btn}
            onClick={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            Sign up
          </button>
          <Link to="/login" className={styles.link}>
            Do you've an account already? Sign in
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
