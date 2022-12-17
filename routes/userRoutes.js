const cors = require("cors");
const { Router } = require("express");

const router = Router();
const {
  register_post,
  login_post,
  deleteUser,
  logout_get,
} = require("../controllers/userControllers");
const verifyEmail = require("../controllers/verifyEmailController");

router.post("/register", register_post);
router.post("/login", login_post);
router.get("/logout", logout_get);
router.delete("/users/:user", cors(), deleteUser);
// router.get("/:emailToken", userController.verifyEmail);

module.exports = router;
