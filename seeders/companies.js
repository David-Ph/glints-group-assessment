const { Company } = require("../models");
const faker = require("faker");

const addCompanies = async () => {
  for (let i = 0; i < 5; i++) {
    await Company.create({
      name: faker.company.companyName(),
      email: faker.internet.email(),
    });
  }
};

const removeCompanies = async () => {
  await Company.remove();
};

module.exports = { addCompanies, removeCompanies };
