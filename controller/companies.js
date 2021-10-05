const { Company } = require("../models");

class CompanyController {
  async getCompanies(req, res, next) {
    try {
      // sorting
      const sortField = req.query.sortBy || "name";
      const orderBy = req.query.orderBy || "desc";

      // pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // find data
      const data = await Company.find(query)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      if (data.length === 0) {
        return next({ message: "No companies found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createCompany(req, res, next) {
    try {
      const data = await Company.create(req.body);

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateCompany(req, res, next) {
    try {
      const data = await Company.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteCompany(req, res, next) {
    try {
      const data = await Company.findOneAndDelete({ _id: req.params.id });

      if (!data) {
        return next({ statusCode: 404, message: "Company not found" });
      }

      res.status(200).json({ message: "Company successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CompanyController();
