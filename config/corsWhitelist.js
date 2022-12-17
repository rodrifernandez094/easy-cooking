const origin = process.env.ORIGIN;

const corsWhitelist = [
  origin,
  "https://easy-cooking-recipes.netlify.app/",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://localhost:3000",
];

module.exports = corsWhitelist;
