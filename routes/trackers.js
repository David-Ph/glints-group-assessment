const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const TrackerController = require("../controller/trackers");

// ? import validators
// ////////////////////

// ? set routers
// //////////////
router.get("/", TrackerController.getTrackers);
router.post("/", TrackerController.createTracker);
router.put("/:id", TrackerController.updateTracker);
router.delete("/:id", TrackerController.deleteTracker);

// ? export router
//////////////////
module.exports = router;
//
