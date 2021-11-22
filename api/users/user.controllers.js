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
    const saltrounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltrounds);
    req.body.password = hashedPass;
    const newUser = await User.create(req.body);
    await Profile.create({
      owner: newUser._id,
      image: "",
      //you can add unique slug. but make sure to uncoment the profile schema
    });
    const token = createToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = await createToken(req.user);
  res.json({ token });
};
