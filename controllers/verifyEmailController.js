const User = require("../models/User");

const verifyEmail = async (req, res) => {
  const emailToken = req.params.emailToken;

  try {
    const user = await User.findOne({ emailToken: emailToken });

    if (user) {
      await user.updateOne(
        { activated: true },
        { where: { emailToken: emailToken } }
      );
    }
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyEmail;
