const { addCompanies, removeCompanies } = require("./companies");
const { addPics, removePics } = require("./pics");
const { addTalents, removeTalents } = require("./talents");
const { addTrackers, removeTrackers } = require("./trackers");

async function add() {
  await Promise.all([addCompanies(), addPics(), addTalents()]);
  await addTrackers();
}

async function remove() {
  await Promise.all([
    removeCompanies(),
    removePics(),
    removeTalents(),
    removeTrackers(),
  ]);
}

if (process.argv[2] === "add") {
  add().then(() => {
    console.log("Seeders success");
    process.exit(0);
  });
} else if (process.argv[2] === "remove") {
  remove().then(() => {
    console.log("Delete data success");
    process.exit(0);
  });
}

module.exports = { add, remove };
