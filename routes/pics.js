const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const PicController = require("../controller/pics");

// ? import validators
// ////////////////////
const PicValidator = require("../middlewares/validators/pics");

// ? set routers
// //////////////
router.get("/", PicValidator.get, PicController.getPics);
router.post("/", PicValidator.create, PicController.createPic);
router.put(
  "/:id",
  PicValidator.get,
  PicValidator.update,
  PicController.updatePic
);
router.delete("/:id", PicValidator.get, PicController.deletePic);

// ? export router
//////////////////
module.exports = router;
//
