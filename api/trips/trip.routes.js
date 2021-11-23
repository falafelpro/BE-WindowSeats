const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();
const { fetchTrips, updateTrip, createTrip } = require("./trip.controller");

router.get("/", fetchTrips);
// REVIEW: You don't pass the profile ID, you get the user ID from the token
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.array("images", 3),
  updateTrip
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.array("images", 3),
  //upload.single("images"),
  createTrip
);
module.exports = router;
