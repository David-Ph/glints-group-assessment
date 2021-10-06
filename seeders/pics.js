const { Pic } = require("../models");
const faker = require("faker");

const addPics = async () => {
  for (let i = 0; i < 5; i++) {
    await Pic.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });
  }
};

const removePics = async () => {
  await Pic.remove();
};

module.exports = { addPics, removePics };
