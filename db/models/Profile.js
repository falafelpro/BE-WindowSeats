const mongoose = require("mongoose");
//const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProfileSchema = mongoose.Schema({
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  trips: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Trip",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
