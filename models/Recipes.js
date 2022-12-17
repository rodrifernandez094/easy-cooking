const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "you need to add a title"],
    uppercase: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
  },
  steps: {
    type: Array,
  },
  prepInfo: {
    type: Object,
  },
  userName: {
    type: String,
  },
});

recipeSchema.index({ userName: 1 });

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
