import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../api/axios";
import styles from "./navbar.module.css";
import useAuth from "../../../hooks/useAuth";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await axios("/logout", {
      withCredentials: true,
    });
    setAuth(null);
    navigate("/");
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <span
          className={`${styles.logo} ${
            location.pathname === "/" ? styles.text_light : styles.text_dark
          }`}
          onClick={() => navigate("/")}
        >
          Easy cooking
        </span>
        <div
          className={styles.hamburger}
          onClick={() => {
            setIsOpen((prevValue) => !prevValue);
          }}
        >
          <FontAwesomeIcon
            className={`${styles.bars} ${
              location.pathname === "/" ? styles.bg_light : styles.bg_dark
            }`}
            icon={!isOpen ? faBars : faXmark}
            size="2x"
          />
        </div>

        {auth?.accessToken ? (
          <ul className={isOpen ? styles.nav__links_open : styles.nav__links}>
            <li>
              <NavLink
                className={`${styles.link} ${
                  location.pathname === "/"
                    ? styles.text_light
                    : styles.text_dark
                }`}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${styles.link} ${
                  location.pathname === "/"
                    ? styles.text_light
                    : styles.text_dark
                }`}
                to="/recipes"
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${styles.link} ${
                  location.pathname === "/"
                    ? styles.text_light
                    : styles.text_dark
                }`}
                to="write-recipe"
              >
                Write Recipe
              </NavLink>
            </li>
            <li>
              <p
                className={`${styles.link} ${
                  location.pathname === "/"
                    ? styles.text_light
                    : styles.text_dark
                }`}
                onClick={handleLogout}
              >
                Logout
              </p>
            </li>
          </ul>
        ) : (
          <ul className={isOpen ? styles.nav__links_open : styles.nav__links}>
            <li>
              <NavLink
                className={`${styles.link} ${
                  location.pathname === "/" && !isOpen
                    ? styles.text_light
                    : styles.text_dark
                }`}
                to="/register"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${styles.link} ${
                  location.pathname === "/" && !isOpen
                    ? styles.text_light
                    : styles.text_dark
                }`}
                to="login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
