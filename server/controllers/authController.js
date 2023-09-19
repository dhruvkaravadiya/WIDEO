const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
async function signup(req, res) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({ ...req.body, password: hash });
  await newUser.save();
  console.log(req.body);
  res.status(200).send("User Created Successfully");
}

async function signin(req, res) {
  const user = await User.findOne({
    $or: [{ name: req.body.name }, { email: req.body.email }],
  });
  if (!user) {
    return res.status(404).send("User not Found");
  }
  const isCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isCorrect) {
    return res.status(400).send("Wrong Credentials");
  }

  const token = jwt.sign({id:user._id}, process.env.JWT_KEY);
  const { password , ...otherprops } = user._doc;

  console.log("Login Successfull");
  res.cookie("access_token",token,{httpOnly:true}).status(200).json(otherprops);
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
