const Profile = require("../../db/models/Profile");
const fs = require("fs");

exports.fetchProfiles = async (req, res) => {
  try {
    const foundProfiles = await Profile.find()
      .populate("trips")
      .populate("owner");
    return res.json(foundProfiles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.fetchProfileById = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const foundProfile = await Profile.findById(profileId);
    if (foundProfile) {
      return res.status(200).json(foundProfile);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  const { profileId } = req.params;

  console.log(profileId);
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
  }
  try {
    // const foundProfile = await Profile.findById(profileId);
    // console.log(foundProfile);
    // console.log(req.body);
    // if (foundProfile) {
    //   //deletes old profile picture from assets
    //   if (fs.existsSync(foundTrip.image)) fs.unlinkSync(foundTrip.image);
    //   await foundProfile.update(req.body);
    //   return res.status(204).end();
    // } else {
    //   return res.status(404).json({ message: "Profile not found" });
    // }
    Profile.findOneAndUpdate(
      { "owner._id": req.payload.id },
      req.body,
      { upsert: true },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    );
  } catch (error) {
    next(error);
  }
};
