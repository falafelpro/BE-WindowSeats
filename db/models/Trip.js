const mongoose = require("mongoose");
const TripSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  highlight: {
    type: [String],
  },
  rating: { type: Number },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Trip", TripSchema);
