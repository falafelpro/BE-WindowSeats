const express = require("express");
// const upload = require("../../middleware/multer");
const { tripListFetch } = require("./trips.controllers");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchProduct(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    next({ status: 404, message: "Trip Not Found!" });
  }
});

router.get("/", tripListFetch);

module.exports = router;
