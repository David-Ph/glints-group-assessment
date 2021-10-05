const { Tracker, Talent, Pic, Company } = require("../../models");
const mongoose = require("mongoose");
const validator = require("validator");
const trackerStatus = require("../../config/status.json");

class TrackerValidator {
  async create(req, res, next) {
    try {
      // if req.body.field is null/undefined, assign it an empty string
      // this is simply to avoid validator error: expected a string but received an undefied
      req.body.talent = req.body.talent ?? "";
      req.body.pic = req.body.pic ?? "";
      req.body.company = req.body.company ?? "";

      const errorMessages = [];

      // check if talent, pic, or company id is valid

      if (!mongoose.Types.ObjectId.isValid(req.body.talent)) {
        errorMessages.push("Please enter valid Talent id");
      }

      if (!mongoose.Types.ObjectId.isValid(req.body.pic)) {
        errorMessages.push("Please enter valid PIC id");
      }

      if (!mongoose.Types.ObjectId.isValid(req.body.company)) {
        errorMessages.push("Please enter valid Company id");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      // check if a talent has applied to a company
      const findTrackers = await Tracker.find({
        talent: req.body.talent,
        company: req.body.company,
      });

      if (findTrackers.length > 0) {
        return next({
          statusCode: 400,
          message: "Talent has applied to this company before",
        });
      }

      // check if talents, PIC, and company exists
      const findTalent = await Talent.findOne({ _id: req.body.talent });
      const findPic = await Pic.findOne({ _id: req.body.pic });
      const findCompany = await Company.findOne({ _id: req.body.company });

      if (!findTalent) {
        errorMessages.push("Talent not found");
      }

      if (!findPic) {
        errorMessages.push("Pic not found");
      }

      if (!findCompany) {
        errorMessages.push("Company not found");
      }

      // make sure status is set to review at time of creation
      req.body.status = "review";

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const errorMessages = [];

      if (req.params.id) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          errorMessages.push("Please enter valid id");
        }
      }

      if (req.query.limit) {
        if (!validator.isInt(req.query.limit)) {
          errorMessages.push("Please enter proper number for limit query");
        }
      }

      if (req.query.page) {
        if (!validator.isInt(req.query.page)) {
          errorMessages.push("Please enter proper number for page query");
        }
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      // find item first and fill it to missing req.body
      // this is to avoid user not sending a field when updating
      const findTracker = await Tracker.findOne({ _id: req.params.id });
      if (!findTracker) {
        return next({ statusCode: 404, message: "Tracker not found" });
      }
      req.body.status = req.body.status ?? findTracker.status;

      const errorMessages = [];

      if (req.body.talent || req.body.pic || req.body.company) {
        errorMessages.push("You can't update Talent, PIC, or Company");
      }

      if (!trackerStatus.includes(req.body.status)) {
        errorMessages.push("Invalid status");
      }

      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TrackerValidator();
