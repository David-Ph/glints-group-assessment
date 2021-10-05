const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const PicController = require("../controller/pics");

// ? import validators
// ////////////////////

// ? set routers
// //////////////
router.get("/", PicController.getPics);
router.post("/", PicController.createPic);
router.put("/:id", PicController.updatePic);
router.delete("/:id", PicController.deletePic);

// ? export router
//////////////////
module.exports = router;
//
