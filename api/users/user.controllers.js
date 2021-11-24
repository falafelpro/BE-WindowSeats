const User = require("../../db/models/User");
const Profile = require("../../db/models/Profile");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");

const createToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPass;
    const newUser = await User.create(req.body);
    await Profile.create({
      owner: newUser._id,
      image: "",
    });
    const token = createToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = await createToken(req.user);
    console.log(token);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
