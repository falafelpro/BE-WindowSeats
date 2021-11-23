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
    // REVIEW: Purpose can be enum right? cuz it's either business or leisure right?
    type: String,
  },
  images: {
    type: [String],
  },
  // if it's an array of highlights, it should be `highlights`
  highlight: {
    type: [String],
  },
  rating: { type: Number },
  startDate: { type: Date },
  // REVIEW: If you have lengthInDays, why do you need endDate.
  // REVIEW: lengthInDays can be a virtual field, that's better.
  endDate: { type: Date },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Trip", TripSchema);
