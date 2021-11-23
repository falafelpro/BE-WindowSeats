const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();
const {
  fetchTrips,
  updateTrip,
  createTrip,
  deleteTrip,
} = require("./trip.controller");

router.get("/", fetchTrips);
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.array("images", 3),
  updateTrip
);
router.post(
  "/",
  //passport.authenticate("jwt", { session: false }),
  upload.array("images", 3),
  //upload.single("images"),
  createTrip
);

router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);
module.exports = router;
