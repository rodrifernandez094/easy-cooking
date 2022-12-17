const handleLoginErrors = (err) => {
  if (err.message) return { message: err.message };
};

const handleRegisterErrors = (err) => {
  let errors = { message: "" };

  //duplicate email validation
  if (err.code === 11000)
    return { message: "Your email or username is already taken." };

  //registration errors validation
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors.message = properties.message;
    });
  }

  return errors;
};

module.exports = {
  handleLoginErrors,
  handleRegisterErrors,
};
