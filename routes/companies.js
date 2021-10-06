const express = require("express");
const router = express.Router();

// ? import controllers
// //////////////////////
const CompanyController = require("../controller/companies");

// ? import validators
// ////////////////////
const CompanyValidator = require("../middlewares/validators/companies");

// ? set routers
// //////////////
router.get("/", CompanyValidator.get, CompanyController.getCompanies);
router.post("/", CompanyValidator.create, CompanyController.createCompany);
router.put(
  "/:id",
  CompanyValidator.get,
  CompanyValidator.update,
  CompanyController.updateCompany
);
router.delete(
  "/:id",
  CompanyValidator.get,
  CompanyValidator.delete,
  CompanyController.deleteCompany
);

// ? export router
//////////////////
module.exports = router;
