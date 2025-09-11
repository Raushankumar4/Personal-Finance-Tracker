const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username,Email and Password are required Fields!",
      success: false,
    });
  }
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required Fields",
      success: false,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Email does not exist. Please create an account first.",
    });
  }

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    return res.status(401).json({
      success: false,
      message: "Wrong password!",
    });
  }

  const token = generateToken(user);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
});

module.exports = { register, login };
