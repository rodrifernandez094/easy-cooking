const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send({ error: "Token not found." });
  }
  const token = authHeader.split(" ")[1];
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
  console.log(authHeader);
  //check if jwt exist
  if (token) {
    jwt.verify(token, tokenSecret, (err, decodedToken) => {
      if (err) {
        res.status(403).send({ error: err.message });
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (token) {
    jwt.verify(token, tokenSecret, async (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
