const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const TalentController = require("../controller/talents");

// ? import validators
// ////////////////////
const TalentValidator = require("../middlewares/validators/talents");

// ? set routers
// //////////////
router.get("/", TalentValidator.get, TalentController.getTalents);
router.post("/", TalentValidator.create, TalentController.createTalent);
router.put(
  "/:id",
  TalentValidator.get,
  TalentValidator.update,
  TalentController.updateTalent
);
router.delete("/:id", TalentValidator.get, TalentController.deleteTalent);

// ? export router
//////////////////
module.exports = router;
