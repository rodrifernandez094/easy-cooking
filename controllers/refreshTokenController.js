const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.userName !== decoded.userName) {
      return res.status(403).json({ Error: err.message });
    }

    const accessToken = jwt.sign(
      { userName: decoded.userName },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "300s" }
    );

    res.status(200).json({ accessToken, userName: user.userName });
  });
};

module.exports = { handleRefreshToken };
