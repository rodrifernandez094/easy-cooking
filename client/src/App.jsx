import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PublicRoutes from "./components/PublicRoutes";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import WriteRecipe from "./pages/WriteRecipe";
import AuthStateChange from "./components/AuthStateChange";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Easy Cooking</title>
        <link
          rel="canonical"
          href="https://easy-cooking-recipes.herokuapp.com/"
        />
      </Helmet>
      <Layout>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* protected routes */}
          <Route element={<AuthStateChange />}>
            <Route element={<RequireAuth />}>
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<Recipe />} />
              <Route path="/write-recipe" element={<WriteRecipe />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
