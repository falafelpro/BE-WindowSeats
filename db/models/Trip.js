const mongoose = require("mongoose");
const TripSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  departure: {
    type: String,
  },
  destination: {
    type: String,
  },
  purpose: {
    enum: ["Bussniss", "Leisure", "7dag", null],
  },
  images: {
    type: [String],
  },
  highlights: {
    type: [String],
  },
  rating: { type: Number },
  season: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Trip", TripSchema);
