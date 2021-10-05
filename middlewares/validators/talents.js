const { Talent } = require("../../models");
const mongoose = require("mongoose");
const validator = require("validator");

class TalentValidator {
  async create(req, res, next) {
    try {
      // if req.body.field is null/undefined, assign it an empty string
      // this is simply to avoid validator error: expected a string but received an undefied
      req.body.name = req.body.name ?? "";
      req.body.email = req.body.email ?? "";

      const errorMessages = [];

      if (!validator.isLength(req.body.name, { min: 3, max: 50 })) {
        errorMessages.push("Name can only be between 3 to 50 characters");
      }

      if (
        !validator.isAlphanumeric(req.body.name, "en-US", {
          ignore: " ",
        })
      ) {
        errorMessages.push("Name can only contains alphabets and numbers");
      }

      if (!validator.isEmail(req.body.email)) {
        errorMessages.push("Invalid email format");
      }

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
      const findTalent = await Talent.findOne({ _id: req.params.id });
      if (!findTalent) {
        return next({ statusCode: 404, message: "Talent not found" });
      }
      req.body.name = req.body.name ?? findTalent.name;
      req.body.email = req.body.email ?? findTalent.email;

      const errorMessages = [];

      if (!validator.isLength(req.body.name, { min: 3, max: 50 })) {
        errorMessages.push("Name can only be between 3 to 50 characters");
      }

      if (
        !validator.isAlphanumeric(req.body.name, "en-US", {
          ignore: " ",
        })
      ) {
        errorMessages.push("Name can only contains alphabets and numbers");
      }

      if (!validator.isEmail(req.body.email)) {
        errorMessages.push("Invalid email format");
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

module.exports = new TalentValidator();
