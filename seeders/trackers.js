const { Talent, Company, Tracker, Pic } = require("../models");

const addTrackers = async () => {
  const findTalents = await Talent.find();
  const findCompanies = await Company.find();
  const findPics = await Pic.find();

  for (let i = 0; i < findTalents.length; i++) {
    for (let j = 0; j < 2; j++) {
      await Tracker.create({
        talent: findTalents[i]._id,
        pic: findPics[i]._id,
        company: findCompanies[j]._id,
      });
    }
  }
};

const removeTrackers = async () => {
  await Tracker.remove();
};

module.exports = { addTrackers, removeTrackers };
