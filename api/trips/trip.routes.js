const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();
const { fetchTrips, updateTrip } = require("./trip.controller");

router.get("/", fetchTrips);
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateTrip
);
module.exports = router;
