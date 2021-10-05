const { Pic } = require("../models");

class PicController {
  async getPics(req, res, next) {
    try {
      // sorting
      const sortField = req.query.sortBy || "name";
      const orderBy = req.query.orderBy || "desc";

      // pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // find data
      const data = await Pic.find(query)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      if (data.length === 0) {
        return next({ message: "No pics found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createPic(req, res, next) {
    try {
      const data = await Pic.create(req.body);

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updatePic(req, res, next) {
    try {
      const data = await Pic.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deletePic(req, res, next) {
    try {
      const data = await Pic.findOneAndDelete({ _id: req.params.id });

      if (!data) {
        return next({ statusCode: 404, message: "Pic not found" });
      }

      res.status(200).json({ message: "Pic successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PicController();
