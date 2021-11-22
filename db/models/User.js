const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // profile: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Profile",
  // },
});
module.exports = mongoose.model("User", UserSchema);
