const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////

// ? import validators
// ////////////////////

// ? set routers
// //////////////
router.get("/");
router.get("/detail/:id");

router.post("/");

router.put("/:id");

router.delete("/:id");
// ? export router
//////////////////
module.exports = router;
//
