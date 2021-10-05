const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const CompanyController = require("../controller/companies");

// ? import validators
// ////////////////////

// ? set routers
// //////////////
router.get("/", CompanyController.getCompanies);
router.post("/", CompanyController.createCompany);
router.put("/:id", CompanyController.updateCompany);
router.delete("/:id", CompanyController.deleteCompany);

// ? export router
//////////////////
module.exports = router;
//
