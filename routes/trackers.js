const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const TrackerController = require("../controller/trackers");

// ? import validators
// ////////////////////
const TrackerValidator = require("../middlewares/validators/trackers");

// ? set routers
// //////////////
router.get("/", TrackerValidator.get, TrackerController.getTrackers);
router.post("/", TrackerValidator.create, TrackerController.createTracker);
router.put(
  "/:id",
  TrackerValidator.get,
  TrackerValidator.update,
  TrackerController.updateTracker
);
router.delete("/:id", TrackerValidator.get, TrackerController.deleteTracker);

// ? export router
//////////////////
module.exports = router;
//
