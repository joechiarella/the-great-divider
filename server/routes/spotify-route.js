const express = require("express");
// Import users controller
const spotifyController = require("./../controllers/spotify-controller.js");
// Create express router
const router = express.Router();
// Create rout between usersController and '/all' endpoint
// Note:
// Main route (in server.js) for users
// is set to '/users'
// This means that all users routes
// will be prefixed with /users'
// i.e.: '/all' will become '/users/all'
router.get("/login", spotifyController.spotifyLogin);
router.get("/callback", spotifyController.spotifyCallback);
router.get("/refresh", spotifyController.spotifyRefresh);
// Export router
module.exports = router;
