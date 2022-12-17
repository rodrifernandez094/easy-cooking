const User = require("../models/User");
const Recipe = require("../models/Recipes");
const {
  handleLoginErrors,
  handleRegisterErrors,
} = require("../helpers/handleValidation");
const {
  createAccessToken,
  createRefreshToken,
} = require("../helpers/createToken");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
// const { sendEmail } = require("../helpers/mailer");

module.exports.register_post = async (req, res) => {
  const { userName, email, password } = req.body;
  const emailToken = randomstring.generate();

  try {
    const user = await User.create({
      userName,
      email,
      password,
      activated: true,
      emailToken,
      refreshToken: "",
    });

    //verify email functionality not implemented as I lack a Domain
    // const url = `https://easy-cooking-recipes.herokuapp.com/${emailToken}`;
    //email confirmation content
    // const mailOptions = {
    //   from: process.env.USER_EMAIL,
    //   to: user.email,
    //   subject: "Verify your email to complete your registration",
    //   html: `please verify your email clicking in this link: <a href="${url}">${url}</a>`,
    // };
    // await sendEmail(mailOptions);

    res.status(201).json({ success: "New user created" });
  } catch (err) {
    console.log(err.errors);
    const errors = handleRegisterErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const accessToken = createAccessToken(user.userName, jwt);
    const refreshToken = createRefreshToken(user.userName, jwt);

    user.refreshToken = refreshToken;
    const result = await user.save(); //save refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 3000 * 60 * 60 * 24,
      //SameSite: "None",
      secure: true,
    });
    res.status(200).json({ accessToken, userName: user.userName });
  } catch (err) {
    const errors = handleLoginErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.logout_get = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  //check if refresh token is in db
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  user.refreshToken = "";
  const result = await user.save(); //delete refresh token from db.
  res.clearCookie("jwt", { httpOnly: true }); //add secure flag on production
  res.sendStatus(204);
};

module.exports.deleteUser = async (req, res) => {
  const userName = req.params.user;

  const recipes = await Recipe.find({ userName });

  if (recipes.length >= 1) {
    await Recipe.deleteMany({ userName });
  }

  await User.findOneAndDelete({ userName });

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(200);
};
