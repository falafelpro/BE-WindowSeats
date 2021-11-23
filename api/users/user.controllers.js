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
    // REVIEW: saltRounds not saltrounds
    const saltrounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltrounds);
    req.body.password = hashedPass;
    const newUser = await User.create(req.body);
    await Profile.create({
      owner: newUser._id,
      image: "",
      // REVIEW: Why do you need a slug for a mobile application?
      //you can add unique slug. but make sure to uncoment the profile schema
    });
    const token = createToken(newUser);
    // REVIEW: remove console log if you're done with it
    console.log(token);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = await createToken(req.user);
  // REVIEW: remove console log if you're done with it

  console.log(token);

  res.json({ token });
};
