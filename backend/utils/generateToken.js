const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    }
  );
  if (!token) throw new Error("Failed to generate Token");
  return token;
};
module.exports = generateToken;
