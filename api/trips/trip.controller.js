const Profile = require("../../db/models/Trip");
const fs = require("fs");

exports.fetchTrips = async (req, res) => {
  try {
    const foundTrips = await Profile.find().populate("owner");
    return res.json(foundTrips);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateTrip = async (req, res, next) => {
  const { tripId } = req.params;
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
  }
  try {
    const foundTrip = await Profile.findByPk(tripId);
    if (foundTrip) {
      //deletes old profile picture from assets
      fs.unlinkSync(foundTrip.image);
      await foundTrip.update(req.body);
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    next(error);
  }
};
