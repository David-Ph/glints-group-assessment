const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema(
  {
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
    },
    pic: {
      type: mongoose.Types.ObjectId,
      ref: "Pic",
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    status: {
      type: String,
      enum: [
        "review",
        "hr interview",
        "user interview",
        "offer",
        "rejected",
        "accepted",
      ],
      default: "Review",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

trackerSchema.index({ talent: 1, company: 1 }, { unique: true });

module.exports = mongoose.model("Tracker", trackerSchema);
