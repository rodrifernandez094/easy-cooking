const Recipe = require("../models/Recipes");

module.exports.recipes_get = (req, res) => {
  const user = req.query.user;
  if (user) {
    Recipe.find({ userName: user }, (err, recipes) => {
      res.status(200).json({ recipes });
    });
  } else {
    Recipe.find({}, (err, recipes) => {
      res.status(200).json({ recipes });
    });
  }
};

module.exports.recipeId_get = (req, res) => {
  const recipeId = req.params.id;
  Recipe.findById(recipeId, (err, recipe) => {
    if (err) res.status(404).send({ error: err.message });
    else res.status(200).json({ recipe });
  });
};

module.exports.writeRecipe_post = async (req, res) => {
  const { title, image, description, ingredients, steps, userName, prepInfo } =
    req.body;

  try {
    const recipe = await Recipe.create({
      title,
      image,
      description,
      ingredients,
      steps,
      prepInfo,
      userName,
    });

    res.status(201).json({ recipe: recipe._id });
  } catch (err) {
    console.error(err);
  }
};

module.exports.deleteRecipe = (req, res) => {
  const recipeId = req.params.id;
  Recipe.findByIdAndDelete(recipeId, (err) => {
    if (err) res.status(404).send({ error: err.message });
    res.sendStatus(200);
  });
};
