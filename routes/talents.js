const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const TalentController = require("../controller/talents");

// ? import validators
// ////////////////////

// ? set routers
// //////////////
router.get("/", TalentController.getTalents);
router.post("/", TalentController.createTalent);
router.put("/:id", TalentController.updateTalent);
router.delete("/:id", TalentController.deleteTalent);

// ? export router
//////////////////
module.exports = router;
