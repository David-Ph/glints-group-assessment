const { Talent } = require("../models");
const faker = require("faker");

const addTalents = async () => {
  for (let i = 0; i < 5; i++) {
    await Talent.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });
  }
};

const removeTalents = async () => {
  await Talent.remove();
};

module.exports = { addTalents, removeTalents };
