const mongoose = require("mongoose");
const TripSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  lengthInDays: {
    type: Number,
  },
  departure: {
    type: String,
  },
  destination: {
    type: String,
  },
  purpose: {
    type: String,
  },
  images: {
    type: [String],
  },
  highlight: {
    type: [String],
  },
  rating: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Trip", TripSchema);
