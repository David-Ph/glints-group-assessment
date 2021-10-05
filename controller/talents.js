const { Talent } = require("../models");

class TalentController {
  async getTalents(req, res, next) {
    try {
      // sorting
      const sortField = req.query.sortBy || "name";
      const orderBy = req.query.orderBy || "asc";

      // pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // find data
      const data = await Talent.find()
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      if (data.length === 0) {
        return next({ message: "No talents found", statusCode: 404 });
      }

      res.status(200).json({ data, count: data.length });
    } catch (error) {
      next(error);
    }
  }

  async createTalent(req, res, next) {
    try {
      const data = await Talent.create(req.body);

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateTalent(req, res, next) {
    try {
      const data = await Talent.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteTalent(req, res, next) {
    try {
      const data = await Talent.findOneAndDelete({ _id: req.params.id });

      if (!data) {
        return next({ statusCode: 404, message: "Talent not found" });
      }

      res.status(200).json({ message: "Talent successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TalentController();
