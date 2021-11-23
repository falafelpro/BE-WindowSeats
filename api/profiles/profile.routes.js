const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();
const {
  fetchProfiles,
  fetchProfileById,
  updateProfile,
} = require("./profile.controller");

// // Param Middleware
// router.param("profileId", async (req, res, next, profileId) => {
//   const Profile = await fetchRecipes(profileId, next);
//   if (Profile) {
//     req.Profile = Profile;
//     next();
//   } else {
//     next({ status: 404, message: "Profile Not Found!" });
//   }
// });

// REVIEW: You dont need the profileId, you have the user's ID from the token

router.get("/", fetchProfiles);
router.get("/:profileId", fetchProfileById);
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);
module.exports = router;
