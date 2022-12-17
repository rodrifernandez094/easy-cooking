import styles from "./login.module.css";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const Login = () => {
  const [credentials, setCredentials] = useState(null);
  const [errors, setErrors] = useState(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //path where the user came from

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", credentials, {
        withCredentials: true,
      });
      setAuth(res.data.userName);
      navigate(from, { replace: true });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.form__title}>Log in</h2>
        <div className={styles.form__control}>
          {errors && <div className={styles.errors}> {errors?.message} </div>}
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
              handleLogin();
            }}
          >
            Log in
          </button>
          <Link to="/register" className={styles.link}>
            ¿Are you new? Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
