const Trip = require("../../db/models/Trip");
const fs = require("fs");

exports.fetchTrips = async (req, res) => {
  try {
    // REVIEW: Make sure you're not passing the password when populating owner
    const foundTrips = await Trip.find().populate("owner");
    return res.json(foundTrips);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateTrip = async (req, res, next) => {
  const { tripId } = req.params;
  if (req.files) {
    // REVIEW: .forEach inside it push is a .map
    req.files.forEach((file) => {
      req.body.images.push(
        `${req.protocol}://${req.get("host")}/${req.file.path}`
      );
    });
  }
  try {
    const foundTrip = await Trip.findById(tripId);
    if (foundTrip) {
      //deletes old profile picture from assets
      // foundTrip.image?.forEach((image) => {
      //   if (fs.existsSync(foundTrip.image)) fs.unlinkSync(foundTrip.image);
      // });

      // REVIEW: Why not return the updated trip as a response?
      await foundTrip.update(req.body);
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  // REVIEW: remove console log if you're done with it
  console.log(req.file);
  //console.log(req.body);
  if (req.files) {
    // REVIEW: .forEach inside it push is a .map
    const test = [];
    req.files.forEach((file) => {
      test.push(`${req.protocol}://${req.get("host")}/${file.path}`);
    });
    req.body.images = test;
    console.log("second one:", req.body);
  }
  try {
    console.log(req.body);
    const newTrip = await Trip.create(req.body);
    console.log(newTrip);
    return res.status(200).json(newTrip);
  } catch (error) {
    next(error);
  }
};
