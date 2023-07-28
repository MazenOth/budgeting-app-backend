const { User, validate } = require("../models/user");
const _ = require("lodash");

const signup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered.");
  }
  user = new User(_.pick(req.body, ["email", "password"]));
  user = await user.save();
  res.send(user);
};

const signin = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.status(200).send("Signed in successfully!");
  } else {
    return res.status(400).send("Please check your email or password!");
  }
};

module.exports = { signup, signin };
