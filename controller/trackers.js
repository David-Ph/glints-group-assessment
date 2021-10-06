const { Tracker } = require("../models");
const trackerStatus = require("../config/status.json");

class TrackerController {
  async getStatus(req, res, next) {
    try {
      res.send(trackerStatus);
    } catch (error) {
      next(error);
    }
  }

  async getTrackers(req, res, next) {
    try {
      // set up status filter
      const query = {};

      if (req.query.status) query.status = req.query.status;

      // sorting
      const sortField = req.query.sortBy || "createdAt";
      const orderBy = req.query.orderBy || "desc";

      // pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // find data
      const data = await Tracker.find(query)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .populate("talent", "_id name email")
        .populate("company", "_id name email")
        .populate("pic", "_id name email");

      const count = await Tracker.count(query);

      if (data.length === 0) {
        return next({ message: "No trackers found", statusCode: 404 });
      }

      res.status(200).json({ data, count });
    } catch (error) {
      next(error);
    }
  }

  async createTracker(req, res, next) {
    try {
      const data = await Tracker.create(req.body);

      const findData = await Tracker.findOne({ _id: data._id })
        .populate("talent", "_id name email")
        .populate("company", "_id name email")
        .populate("pic", "_id name email");

      res.status(201).json({ findData });
    } catch (error) {
      next(error);
    }
  }

  async updateTracker(req, res, next) {
    try {
      const data = await Tracker.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
        .populate("talent", "_id name email")
        .populate("company", "_id name email")
        .populate("pic", "_id name email");

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteTracker(req, res, next) {
    try {
      const data = await Tracker.findOneAndDelete({ _id: req.params.id });

      if (!data) {
        return next({ statusCode: 404, message: "Tracker not found" });
      }

      res.status(200).json({ message: "Tracker successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TrackerController();
