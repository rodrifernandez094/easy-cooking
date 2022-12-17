const createAccessToken = (userName, jwt) => {
  return jwt.sign({ userName }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "300s",
  });
};
const createRefreshToken = (userName, jwt) => {
  return jwt.sign({ userName }, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "1d",
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
