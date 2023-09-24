const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// async function signup(req, res) {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(req.body.password, salt);
//   const newUser = new User({ ...req.body, password: hash });
//   await newUser.save();
//   console.log(req.body);
//   res.status(200).send("User Created Successfully");
// }



async function signup(req, res) {
  // Validate request data
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("Name, Email, and Password are required");
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({ message: "Email is already in use" });
  }
  // Create hashed password and user object
  const hashedPassword = User.createHashedPassword(req.body.password);
  const user = new User({
    ...req.body,
    password: hashedPassword
  });
  // Save user and send email
  await user.save();
  const token = user.generateToken(user);
  // Set cookie and respond
  res
    .status(200)
    .cookie("access_token", token, { expiresIn: new Date(Date.now() + process.env.TOKEN_EXPIRY) })
    .json({ success: true, token, user });
}

async function signin(req, res) {
  const user = await User.findOne({
    $or: [{ name: req.body.name }, { email: req.body.email }],
  });
  if (!user) {
    return res.status(404).send("User Not Found");
  }
  const isPasswordCorrect = await user.verifyPassword(req.body.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Password is incorrect");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  const { password, ...otherProperties } = user._doc;
  console.log("Login Success");

  res
    .cookie("access_token", token , {httpOnly:true})
    .status(200)
    .json({success:true,access_token:token,user:otherProperties});
}


async function logout(req, res) {
  res
    .cookie("access_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })
  res.status(200).json({ success: true, message: "Successful Logout" });
}
module.exports = { signup, signin , logout };
