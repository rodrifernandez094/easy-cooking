const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const refreshTokenRoute = require("./routes/refreshTokenRoute");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { checkUser } = require("./middleware/authMiddleware");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const path = require("path");

const app = express();
dotenv.config({ path: `${__dirname}/config/config.env` });

//middleware
app.use(credentials); // handle options credentials check
app.options("/delete-user", cors(corsOptions));
app.options("/delete-recipe", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//DB connection
const DB_user = process.env.DB_USER;
const DB_pass = process.env.DB_PASS;
const DB_name = process.env.DB_NAME;

const dbUri = `mongodb+srv://${DB_user}:${DB_pass}@cluster0.acdog.mongodb.net/${DB_name}?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(port, () => console.log(`listening on port ${port}`))
  )
  .catch((err) => console.error(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist/")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use(recipeRoutes);
app.use(userRoutes);
app.use(refreshTokenRoute);
