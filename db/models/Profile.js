const mongoose = require("mongoose");
//const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProfileSchema = mongoose.Schema({
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  //slug: String,
  // REVIEW: Why do you need the list of trips here? Every trip has its owner ID, you can filter by the userID
  trips: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Trip",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
//ProfileSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Profile", ProfileSchema);
