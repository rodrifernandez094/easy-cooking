const corsWhitelist = require("../config/corsWhitelist");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (corsWhitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
