const User = require("../../db/models/User");
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

    const token = createToken(newUser);

    console.log(token);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = await createToken(req.user);

  console.log(token);

  res.json({ token });
};
