const { requireAuth } = require("../middleware/authMiddleware");
const cors = require("cors");

const recipeController = require("../controllers/recipeControllers");
const { Router } = require("express");
const router = Router();

router.get("/recipes", recipeController.recipes_get);

router.get("/recipes/:id", recipeController.recipeId_get);

router.post("/recipes/new", recipeController.writeRecipe_post);

router.delete("/recipes/:id", cors(), recipeController.deleteRecipe);

module.exports = router;
